import { 
    app, 
    urlencoded, 
    json,
    statics, 
    cookie_parser,
    connect 
} from "../app/init.js";

class Server{

    connectToDB = (URI) =>{
        connect(URI).then( result =>{
            console.log('Connected to DB: ')
        }).catch(error => console.error(error))
    }

    useUrlEncordedPayloads = (option) =>{
        app.use(urlencoded(option))
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