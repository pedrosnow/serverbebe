import express, {Request, Response} from 'express'
import helmet from 'helmet'

const app = express()

app.use(helmet())

app.get('/', (req: Request, res: Response) => {
    res.send('home')
})


app.listen(3000, ()=>{
    console.log('server on http://localhost:3000')
})