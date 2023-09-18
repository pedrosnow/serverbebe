import User from "../db/models/user";
import { Request, Response } from "express";
import bcrypt from 'bcrypt'
import request from "request";
import jwt from 'jsonwebtoken'

export const sendMensage = async (
	req: Request,
	res: Response
) => {

	const { celular, pacienteid, chave } = req.body;
	
	let salt = 10
	let msg = ''
	let secret = (process.env.SECRET ? process.env.SECRET : "")

	const Users = await User.findOne({ where: { acesso: pacienteid } });

	if(Users){

		const token = jwt.sign({ data: {id: Users.id}}, secret, { expiresIn: '1h', });

		msg = `Olá!😊 
Segue o link para acessar a transmissão ao vivo do exame do bebê: http://localhost:3000/live/${token}/${chave.replace(/"/g, '')}
			
*👶🏽 Acesso aos Vídeos do Bebê*

🔑 *Código de Acesso:* ${pacienteid}
🔒 *Senha:* ${chave.replace(/"/g, '')}

*⚠️ Aviso Importante! *
Os vídeos armazenados na nuvem têm um período de validade de até 9 meses. Após esse período, os vídeos serão removidos automaticamente. 
Recomendamos que a mamãe e o papai façam o download dos vídeos e os salvem em outro local seguro. Dessa forma, vocês poderão guardar essas preciosas lembranças por mais tempo. 🥰
`

	}else{


		try {

			let password = await bcrypt.hash(chave.replace(/"/g, ''), salt)

			let response = await User.create({
				Nome: "",
				sobreNome: "",
				email: "",
				acesso: pacienteid.toString(),
				password: password,
				celular: celular.toString(), // Certifique-se de que o celular seja uma string
				pass: chave,
				isAdmin: false,
				createdAt: new Date(),
				updatedAt: new Date('0000-00-00 00:00:00'),
			});

			const token = jwt.sign({ data: {id: response.id}}, secret, { expiresIn: '1h', });
	

			msg = `Olá!😊 
Segue o link para acessar a transmissão ao vivo do exame do bebê: http://localhost:3000/live/${token}/${chave.replace(/"/g, '')}
			
*👶🏽 Acesso aos Vídeos do Bebê*

🔑 *Código de Acesso:* ${pacienteid}
🔒 *Senha:* ${chave.replace(/"/g, '')}

*⚠️ Aviso Importante! *
Os vídeos armazenados na nuvem têm um período de validade de até 9 meses. Após esse período, os vídeos serão removidos automaticamente. 
Recomendamos que a mamãe e o papai façam o download dos vídeos e os salvem em outro local seguro. Dessa forma, vocês poderão guardar essas preciosas lembranças por mais tempo. 🥰
			`
			
		} catch (error) {
			
			res.status(500).json({ msg: "Algo inesperado aconteceu", response: error });

		}
		
	}

	try {
		var options = {
			method: "POST",
			url: `https://${process.env.HOST_API_MEGA}/rest/sendMessage/${process.env.INSTANCE_KEY_MEGA}/text`,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${process.env.TOKEN_API_MEGA}`,
			},
			body: JSON.stringify({
				messageData: {
					to: `55${celular}@s.whatsapp.net`,
					text: msg,
				},
			}),
		};
		request(options, function (error: any, response: any) {
			let bodyresponse = JSON.parse(response.body)
			if(error){
				res.status(200).json({ msg: "erro ao enviar a mensagem", statuserro: bodyresponse.error});
			}
			res.status(200).json({ msg: "sucesso ao enviar a mensagem", statuserro: bodyresponse.error});

		});


	} catch (error) {
		res.status(500).json({ msg: "Algo inesperado aconteceu", response: error });
	}

	
};
