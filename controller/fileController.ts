import axios from 'axios';
import {Request, Response} from 'express'
import fs from 'fs'

export const file = (req:Request, res:Response) => {
    axios({
        method: 'get',
        url: 'http://127.0.0.1:5000/download-video',  // Substitua pelo URL correto do servidor Flask
        responseType: 'stream',
    })
    .then((response) => {
        const writer = fs.createWriteStream('C:/Users/udi/Documents/serverbebe/public/videoStram/video.mp4');  // Substitua pelo caminho onde você deseja salvar o vídeo no servidor Express
        response.data.pipe(writer);
    
        writer.on('finish', () => {
           res.send('Arquivo de vídeo baixado com sucesso!')
        });
    })
    .catch((error) => {
        res.send('Erro ao baixar o arquivo de vídeo: ' + error)
    });

  
}