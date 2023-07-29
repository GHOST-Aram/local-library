import { render } from '../zghost/utils/http-response.js'

export const login_get = (req, res) =>{
    render(res, 'accounts/login', { 
        title: 'Log in', errors: null
    })
} 

export const signup_get = (req, res) =>{
    render(res, 'accounts/signup', {
        title: 'Sign up', errors: null
    })
}