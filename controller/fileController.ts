import axios from 'axios';
import {Request, Response} from 'express'
import fs from 'fs'
import path from 'path';
import Client from 'ssh2-sftp-client'

export const file = (req:Request, res:Response) => {

    const { chave, pacienteid } = req.body
     

     const currentDir = __dirname;
     const rootDir = path.join(currentDir, '..');

     const path_file = `${rootDir}/public/videoStram/${chave}.mp4`


    axios({
        method: 'post',
        url: 'http://127.0.0.1:5000/download-video',  // Substitua pelo URL correto do servidor Flask
        responseType: 'stream',
        data:{
            chave: chave
        }
    })
    .then((response) => {
        const writer = fs.createWriteStream(path_file);  // Substitua pelo caminho onde você deseja salvar o vídeo no servidor Express
        response.data.pipe(writer);
    
        writer.on('finish', () => {
           res.send('Arquivo de vídeo baixado com sucesso!')

           const config = { host: (process.env.HOST_SFTP ? process.env.HOST_SFTP : ""), port: 22, username: (process.env.USERNAME_SFTP ? process.env.USERNAME_SFTP : ""), password:  (process.env.PASSWORD_SFTP ? process.env.PASSWORD_SFTP : "") };

           const pastaNome = `/udi_meubb/${pacienteid}`
           const arquivoNome = `${chave}.mp4`

           const sftp = new Client()

           sftp.connect(config)
           .then(()=>{
                return sftp.mkdir(pastaNome, true);
           })
           .then(() => {
                return sftp.put(path_file, `${pastaNome}/${arquivoNome}`);
            })
            .then(() => {
                console.log(`Pasta "${pastaNome}" criada e arquivo "${arquivoNome}" enviado com sucesso para o servidor.`);
                sftp.end();
            })
            .catch(err => {
                console.error('Erro:', err.message);
                sftp.end();
            });



        });
    })
    .catch((error) => {
        res.send('Erro ao baixar o arquivo de vídeo: ' + error)
    });

  
}

export const uploadNas = (req:Request, res:Response) => {
   
}