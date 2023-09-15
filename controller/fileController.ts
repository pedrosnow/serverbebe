import axios from 'axios';
import {Request, Response} from 'express'
import fs from 'fs'
import path from 'path';
import Client from 'ssh2-sftp-client'
import File from '../db/models/file'

const config = { host: (process.env.HOST_SFTP ? process.env.HOST_SFTP : ""), port: 22, username: (process.env.USERNAME_SFTP ? process.env.USERNAME_SFTP : ""), password:  (process.env.PASSWORD_SFTP ? process.env.PASSWORD_SFTP : "") };
const sftp = new Client()


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
           res.send('sucesso')

        });
    })
    .catch((error) => {
        console.log(error)
        res.send('erro')
    });

  
}

export const sftpPut = (req:Request, res:Response) => {

    const currentDir = __dirname;
    const rootDir = path.join(currentDir, '..');

    const path_file = `${rootDir}\\public\\videoStram\\xKqYeQVQd.mkv`
    let pastaNome = "udi_meubb/766499/"

    sftp.connect(config)
    .then(()=>{
        return sftp.mkdir(pastaNome, true);
    })
    .then(() => {
        return sftp.put(path_file, `${pastaNome}/xKqYeQVQd.mkv`);
    })
    .then((data) => {
        console.log(data)
        sftp.end();
    })
    .catch(err => {
        console.error('Erro:', err.message);
        sftp.end();
    });
}

export const sftdownload = async (req:Request, res:Response) => {


   try {

        let arquivoNome = 'xKqYeQVQd.mkv'
        
        await sftp.connect(config);

        await sftp.get('udi_meubb/766499/xKqYeQVQd.mkv', 'xKqYeQVQd.mkv');

        res.setHeader('Content-disposition', `attachment; filename=${arquivoNome}`);
        res.setHeader('Content-type', 'video/x-matroska');

        // Transmita o arquivo para o cliente
        const fileStream = fs.createReadStream('xKqYeQVQd.mkv');
        fileStream.pipe(res);

        // Exclua o arquivo local após o download, se necessário
        fs.unlinkSync('xKqYeQVQd.mkv');

    
   } catch (error) {

        res.status(500).send('Erro ao baixar o arquivo');

   } finally{
    
        await sftp.end();

   }

}

export const sftpList = async (req:Request, res:Response) => {

    const { acesso } = req.body.tokenPayLoad
    
    try {

        const file = await File.findAll({where: {acesso : acesso}})

        res.status(200).json(file)

    } catch (error) {
        
        throw new Error('Erro em trazer os dados')

    }

}