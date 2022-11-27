import 'express-async-errors'
import express  from "express"
import cors from 'cors'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import cookieParser from "cookie-parser"
import fileUpload from "express-fileupload"
import xss from 'xss-clean'
import hpp from 'hpp'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
const app = express()
 

// import authMiddleware from '#lib/auth'
import { errorHandlerMiddleware, notFoundMiddleware } from '#middlewares/error'
// import openApiMidddlewares from '#middlewares/openapi'
import v1routes from '#routes/v1/v1'


//& Allow Cross-Origin requests
app.use(cors());

//& Set security HTTP headers
app.use(helmet());

//& Limit request from the same API 
const limiter = rateLimit({
    max: 150,
    windowMs: 60 * 60 * 1000,
    message: 'Too Many Request from this IP, please try again in an hour'
});
app.use('/api', limiter);

//& Data sanitization against XSS(clean user input from malicious HTML code)
app.use(xss());

//& Prevent parameter pollution
app.use(hpp());

//& reqular middlewares 
app.use(express.json());
app.use(bodyParser.json())
app.use(express.urlencoded({extended: true }))
// app.use(authMiddleware)

//& coookies and file upload 

app.use(cookieParser())
app.use(fileUpload())


//& morgan middleware  to display logs on console of visited routes 
app.use(morgan("tiny"))


//& swagger ui documentation for api's 
// app.use('/docs', ...openApiMidddlewares)


//& routes
app.use('/v1', v1routes)

//& error handling

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

export default app
