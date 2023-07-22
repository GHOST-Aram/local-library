import createHttpError from 'http-errors';
import { router as indexRouter } from './catalog/routes/index.js';
import { app } from './zghost/app/init.js';
import { config } from './zghost/app/config.js';
import { catchAndForward404Error, handle404Error } from './zghost/utils/errors.js';



const createError = createHttpError

config()
app.use('/', indexRouter);













// catch 404 and forward to error handler
app.use(catchAndForward404Error);
// error handler
app.use(handle404Error);
export {app};
