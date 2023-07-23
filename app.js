import { router as catalog } from './catalog/urls.js';
import { cookie_parser } from './zghost/app/init.js';
import { urlencoded } from './zghost/app/init.js';
import { json } from './zghost/app/init.js';
import { statics } from './zghost/app/init.js';
import { app } from './zghost/app/init.js';
import { logger } from './zghost/app/init.js';
import createHttpError from 'http-errors';

const createError = createHttpError

app.set('views', 'views');
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookie_parser());
app.use(statics('public'));

app.all('/', (req, res) =>{
  res.redirect('/catalog')
})
app.use('/catalog', catalog);

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
