import passport from "passport"
import LocalStrategy from 'passport-local'
import { db } from "../db/database.js"
import { User } from "../../catalog/models/user.js"
import { compareSync, hash } from "bcrypt"
import { enableSession } from "../utils/sessions.js"
import { app } from "./init.js"


class Authentication{

    authenticateRoute = ({ successRedirect, failureRedirect }) =>{
        return passport.authenticate('local',{
            successRedirect: successRedirect,
            failureRedirect: failureRedirect,
        })
    }

    authenticateSession = () =>{
        app.use(passport.session())
    }

    deserializeUser = () =>{
        return passport.deserializeUser(async(id, done) =>{
            try {
                const user = await db.findById(User, id)
                done(null, user)
            } catch (err) {
                done(err)
            }
        })
    }
    
    initialize = () => {
        app.use(passport.initialize())
    }
    
    logout = (request, next) =>{
        request.logout((err) =>{
            if(err){
                return next(err)
            }
            next()
        })
    }

    registerUser = async(req) => {
        hash(req.body.password, 10, 
            async(err, hashedPassword) => {
                if(err){
                    throw err
                }
                await db.create(User, {
                    username: req.body.username,
                    password: hashedPassword
                }) 
            })
        
    }

    serializeUser = () => {
        passport.serializeUser((user, done) => {
            return done(null, user.id)
        })
    } 

    setUpSession = ({ secret, maxAge, mongoUrl }) =>{
        app.use(enableSession({
            secret :secret,
            maxAge: maxAge,
            mongoUrl: mongoUrl
        }))
    }

    useLocalStrategy = () => {
        return passport.use(new LocalStrategy(async(username, password, done) => {
            try {
                return await this.#verifyUserInfo(username, password, done)
            } catch (error) {
                return done(error, false, {
                    message: 'Unexpected error occured during authentication'
                })
            }
        }))
    }

    #verifyUserInfo = async(username, password, done) => {

        const user = await this.#findUser(username)
        if(!user){
            return done(null, false, {
                message: 'Username not registered'
            })
        }
        
        const isValidPassword = await this.#validatePassword(
            password, user.password
        )
            console.log('Valid password: ',isValidPassword)
        if(isValidPassword){
            return done(null, user)
        }else{
            return done(null, false, {
                message: 'Incorrect password'
            })
        }
    }

    #findUser = async(username) => {
        return await db.findOne(User, { username: username })
    }

    #validatePassword = async(inputPassword, savedPassowrd) => {
        return compareSync(inputPassword, savedPassowrd)
    }
}

export const auth = new Authentication()