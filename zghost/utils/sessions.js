import MongoStore from "connect-mongo"
import session from "express-session"


export const enableSession = ({secret, maxAge, mongoUrl}) =>{
    return session({
        secret: secret,
        resave: true, saveUninitialized: true,
        store: MongoStore.create({
            mongoUrl: mongoUrl,
        }),
        cookie: {
            maxAge: maxAge
        }
    })
}   