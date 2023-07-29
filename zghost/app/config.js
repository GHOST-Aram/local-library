import { server } from "../utils/server.js"
import { 
    TEMPLATES_DIR, 
    VIEW_ENGINE,
    STATIC,
    DB_URI
} from "../../setting.js"
import { logger } from "./init.js"
import 'dotenv/config'


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
}