import 'express-async-errors'
import express  from "express"
import cors from 'cors'
import morgan from 'morgan'
import cookieParser from "cookie-parser"
import fileUpload from "express-fileupload"
import xss from 'xss-clean'
import hpp from 'hpp'
import bodyParser from 'body-parser'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import swaggerUi from 'swagger-ui-express'
import YAML from 'yamljs'

const app = express()
 
// import openApiMidddlewares from '#middlewares/openapi'
import v1routes from '#routes/v1/v1'
// import * as swagger  from '#docs/swagger' assert { type: "json" };



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
app.use(bodyParser.json());
app.use(express.urlencoded({extended: true }))

//& coookies and file upload 

app.use(cookieParser())
app.use(fileUpload())


//& morgan middleware  to display logs on console of visited routes 
app.use(morgan("tiny"))


//& swagger ui documentation for api's 
// const swaggerDocument = YAML.load(swagger)

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swagger));



//& routes
app.use('/v1', v1routes)



export default app
