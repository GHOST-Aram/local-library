import { index } from './catalog/views/index.js'
import { 
	author_create_get, 
	author_create_post, 
	authors_list 
} from './catalog/views/author.js'
import { 
	genre_create_post,
	genre_create_get, 
	genre_list 
} from './catalog/views/genre.js';
import { app } from './zghost/app/init.js';
import createHttpError from 'http-errors';
import mongoose from 'mongoose';
import { DB_URI } from './setting.js';
import { config } from './zghost/app/config.js';
import { 
	books_create_get, 
	books_create_post, 
	books_list
} from './catalog/views/books.js';
import { bookinstance_create_get } from './catalog/views/book-instance.js';


const createError = createHttpError

config()


mongoose.connect(DB_URI).then(result =>{
	app.all('/', (req, res) =>{
		res.redirect('/catalog')
	})
	app.get('/catalog/', index)
	app.get('/catalog/genres/create', genre_create_get)
	app.post('/catalog/genres/create', genre_create_post)
	app.get('/catalog/genres/list', genre_list)
	app.get('/catalog/authors/create', author_create_get)
	app.post('/catalog/authors/create', author_create_post)
	app.get('/catalog/authors/list', authors_list)
	app.get('/catalog/books/create', books_create_get)
	app.post('/catalog/books/create', books_create_post)
	app.get('/catalog/books/list', books_list)
	app.get('/catalog/bookinstances/create', bookinstance_create_get)

	
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
