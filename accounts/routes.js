import { router as accounts } from "../zghost/app/init.js";
import * as account from './views.js'

accounts.get('/login', account.login_get)
accounts.get('/signup', account.signup_get)

export { accounts }