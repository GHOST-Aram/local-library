import { index } from './catalog/controllers/index.js'
import { 
	author_create_get, 
	author_create_post, 
	authors_list 
} from './catalog/controllers/author.js'
import { 
	genre_create_post,
	genre_create_get 
} from './catalog/controllers/genre.js';
import { cookie_parser } from './zghost/app/init.js';
import { urlencoded } from './zghost/app/init.js';
import { json } from './zghost/app/init.js';
import { statics } from './zghost/app/init.js';
import { app } from './zghost/app/init.js';
import { logger } from './zghost/app/init.js';
import createHttpError from 'http-errors';
import mongoose from 'mongoose';
import { DB_URI } from './setting.js';

const createError = createHttpError

app.set('views', 'views');
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookie_parser());
app.use(statics('public'));


mongoose.connect(DB_URI).then(result =>{
	app.all('/', (req, res) =>{
		res.redirect('/catalog')
	})
	// app.use('/catalog', catalog);
	app.get('/catalog/', index)
	app.get('/catalog/genres/create', genre_create_get)
	app.post('/catalog/genres/create', genre_create_post)
	app.get('/catalog/authors/create', author_create_get)
	app.post('/catalog/authors/create', author_create_post)
	app.get('/catalog/authors/list', authors_list)
	
	app.use(function(req, res, next) {
		next(createError(404));
	});
	app.use(function(err, req, res, next) {
	  // set locals, only providing error in development
	  res.locals.message = err.message;
	  res.locals.error = req.app.get('env') === 'development' ? err : {};
	
	  // render the error page
	  res.status(err.status || 500);
	  res.render('error');
	});
})

// error handler

export {app};
