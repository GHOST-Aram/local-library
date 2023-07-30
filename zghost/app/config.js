import { server } from "../utils/server.js"
import { 
    TEMPLATES_DIR, 
    VIEW_ENGINE,
    STATIC,
} from "../../setting.js"
import { logger } from "./init.js"
import 'dotenv/config'
import { auth } from "./auth.js"


export const config = () =>{
    // general config
    server.connectToDB(process.env.MONGODB_URI)
    server.useUrlEncordedPayloads({extended: false})
    server.logRequests(logger('dev'))
    server.setTemplatesDir(TEMPLATES_DIR)
    server.setViewEngine(VIEW_ENGINE)
    server.useStaticFiles(STATIC)
    
    // production configs
    server.useCompressor() //Compression
    server.useHelmet()
    server.useRateLimiter()

    //authentication and sessions config
    auth.setUpSession({
        secret: process.env.SECRETE,
        maxAge: 3600 * 24,
        mongoUrl: process.env.MONGODB_URI
    })

    auth.useLocalStrategy()
    auth.serializeUser()
    auth.deserializeUser()
    auth.initialize()
    auth.authenticateSession()

}