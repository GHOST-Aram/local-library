import { server } from "../utils/server.js"
import { 
    TEMPLATES_DIR, 
    VIEW_ENGINE,
    STATIC
} from "../../setting.js"
import { logger } from "./init.js"

export const config = () =>{
    server.encodeUrls({extended: false})
    server.logRequests(logger('dev'))
    server.setTemplatesDir(TEMPLATES_DIR)
    server.setViewEngine(VIEW_ENGINE)
    server.useStaticFiles(STATIC)
}