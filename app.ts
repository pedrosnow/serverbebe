import express, { Express} from 'express'
import cookieParser from 'cookie-parser';
import helmet from 'helmet'
import path from 'path'
import 'dotenv/config'
import { router } from './router'
import expressEjsLayouts from 'express-ejs-layouts'


const app: Express = express()

app.use(express.json())

// CSRF cookieParser
app.use(cookieParser())

// helmet setup
app.use(helmet())

// route setup
app.use(router)

// EJS setup
app.use(expressEjsLayouts)

app.use('/static', express.static(__dirname + '/public'));
app.use('/node', express.static('./node_modules'));

// Setting the root path for views directory
app.set('views', path.join(__dirname, 'views'));

// Setting the view engine
app.set('view engine', 'ejs');




export { app }