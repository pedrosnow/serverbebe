import express, { Express } from 'express'
import cookieParser from 'cookie-parser';
import path from 'path'
import 'dotenv/config'
import { router } from './router'
import expressEjsLayouts from 'express-ejs-layouts'
import helmetCsp from 'helmet-csp'


const app: Express = express()

// helmet CSP setup
// app.use(
// helmetCsp({
//     directives: {
//         defaultSrc: ["'self'", "http://localhost"],
//         fontSrc: ["'self'", "data:"],
//         styleSrc: ["'self'", "'unsafe-inline'"],
//         mediaSrc: ["'self'", "http://localhost", "blob:"], // Permita "blob:" para mídia
//         scriptSrc: ["'self'", "http://localhost:3000"],
//         workerSrc: ["'self'", "blob:"],
//     },
//     })
// );

app.use(express.json())

// CSRF cookieParser
app.use(cookieParser())

// helmet setup
// app.use(helmet())

// route setup
app.use(router)

// EJS setup
app.use(expressEjsLayouts)

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules'));

// Setting the root path for views directory
app.set('views', path.join(__dirname, 'views'));

// Setting the view engine
app.set('view engine', 'ejs');



export { app }