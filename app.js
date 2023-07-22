import createHttpError from 'http-errors';
import { router as catalog } from './catalog/urls.js';
import { app } from './zghost/app/init.js';
import { config } from './zghost/app/config.js';
import { catchAndForward404Error, handle404Error } from './zghost/utils/errors.js';



const createError = createHttpError

config()
app.all('/', (req, res) =>{
  res.redirect('/catalog')
})
app.use('/catalog', catalog);













// catch 404 and forward to error handler
app.use(catchAndForward404Error);
// error handler
app.use(handle404Error);
export {app};
