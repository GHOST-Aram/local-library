import passport from "passport"
import LocalStrategy from 'passport-local'
import { db } from "../db/database"
import { User } from "../../catalog/models/user"
import { compare, hash } from "bcrypt"
class Authentication{

    authenticateGlobal = () =>{
        return passport.authenticate('session')
    }

    authenticateLogin = (successRedirect, failureRedirect) =>{
        return passport.authenticate('local',{
            successRedirect: successRedirect,
            failureRedirect: failureRedirect
        })
    }

    deserializeUser = () =>{
        return passport.deserializeUser(async(id, done) =>{
            try {
                const user = await User.findById(id)
                done(null, user)
            } catch (err) {
                done(err)
            }
        })
    }
    
    #encryptPassword = async (password) =>{
        return hash(password, 10, 
            async(err, hashedPassword) =>{
                if(err){
                    throw err
                }
                return hashedPassword
            }
        )
    }

    #findUser = async(username) =>{
        return await db.findOne(User, { username: username})
    }

    initialize = () =>{
        return passport.initialize()
    }

    registerUser = async(req) =>{
        const hashedPassword = await this.#encryptPassword(req.body.password)
        await User.create({
            username: req.body.username,
            password: hashedPassword
        })
    }

    serializeUser = () =>{
        return passport.serializeUser((user, done) =>{
            return done(null, user.id)
        })
    } 

    useLocalStrategy = () =>{
        return passport.use(new LocalStrategy(async(username, password, done) =>{
            try {
                const user = this.#findUser(username)
                
                if(!user){
                    return done(null, false, {
                        message: 'Username not registered'
                    })
                }
                
                const isValidPassword = this.#validatePassword(
                    password, user.password
                )

                if(isValidPassword){
                    return done(null, user)
                }else{
                    return done(null, false, {
                        message: 'Incorrect password'
                    })
                }

            } catch (error) {
                return done(error, false, {
                    message: 'Unexpected error occured during authentication'
                })
            }
        }))
    }

    #validatePassword = (inputPassword, savedPassowrd) =>{
        return compare(inputPassword, savedPassowrd, (err, res) =>{
            if(err) {
                throw err
            }
           res ? true : false
        }) 
    }

}