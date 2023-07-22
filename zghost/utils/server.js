import { 
    app, 
    encordUrl, 
    json,
    statics, 
    cookie_parser 
} from "../app/init.js";

class Server{

    create404H

    encodeUrls = (option) =>{
        encordUrl(option)
    }

    logRequests = (logger) =>{
        app.use(logger);
    }

    parseCookier = () =>{
        app.use(cookie_parser());
    }
    parseJSON = () =>{
        app.use(json())
    }

    setTemplatesDir = (dirname) =>{
       app.set('views',  dirname);
   }

    setViewEngine = (engine) =>{
            app.set('view engine', engine);
    }

    useStaticFiles = (dirname) =>{
        app.use(statics(dirname));
    }

}

export const server = new Server()