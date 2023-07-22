import createHttpError from 'http-errors';
import { router as indexRouter } from './catalog/routes/index.js';
import { app } from './zghost/app/init.js';
import { config } from './zghost/app/config.js';



const createError = createHttpError

// view engine setup
config()
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
export {app};
