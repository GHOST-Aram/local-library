import { 
    app, 
    urlencoded, 
    json,
    statics, 
    cookie_parser,
    connect, 
    rateLimiter,
    compressor,
    helmetSecurity
} from "../app/init.js";

class Server{

    connectToDB = (URI) =>{
        connect(URI).then( result =>{
            console.log('Connected to DB: ')
        }).catch(error => console.error(error))
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
    useCompressor = () =>{
        app.use(compressor())
    }
    useHelmet = () =>{
        app.use(helmetSecurity)
    }
    useStaticFiles = (dirname) =>{
        app.use(statics(dirname));
    }

    useRateLimiter = () =>{
        app.use(rateLimiter)
    }
    useUrlEncordedPayloads = (option) =>{
        app.use(urlencoded(option))
    }



}

export const server = new Server()