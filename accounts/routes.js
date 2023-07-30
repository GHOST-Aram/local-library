import { Router } from 'express'
import * as account from './views.js'


const accounts = Router()
accounts.get('/login', account.login_get)
accounts.get('/signup', account.signup_get)
accounts.post('/signup', account.signup_post)
accounts.post('/login', account.login_post)
accounts.get('/logout', account.logout)

export { accounts }