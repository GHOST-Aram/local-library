import { redirect, render } from '../zghost/utils/http-response.js'
import { auth } from '../zghost/app/auth.js'
import { asynchHandler, validationResult } from '../zghost/app/init.js'
import { validator } from '../zghost/utils/validation.js'

export const login_get = (req, res) =>{
    render(res, 'accounts/login', { 
        title: 'Log in', errors: null
    })
} 

export const login_post = [
    validator.validatePassword('password'),
    validator.validateUsername('username'),
    auth.authenticateRoute({
        successRedirect: '/',
        failureRedirect: '/login'
    })
]
export const signup_get = (req, res) =>{
    render(res, 'accounts/signup', {
        title: 'Sign up', errors: null
    })
}

export const signup_post = [
    validator.validatePassword('password'),
    validator.validateUsername('username'),

    asynchHandler(async(req, res) =>{
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            render(res, 'accounts/signup', {
                title: 'Sign up', errors: errors
            })
        } else {
            auth.registerUser(req)
            redirect(res, '/')
        }
    })
]
