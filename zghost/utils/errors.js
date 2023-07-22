export const catchAndForward404Error = function(req, res, next) {
    next(createError(404));
  }

export const handle404Error = function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  }