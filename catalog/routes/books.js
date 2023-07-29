import { router as books } from "../../zghost/app/init.js"
import * as books from '../views/books.js'


books.get('/create', books_create_get)
books.post('/create', books_create_post)
books.get('/list', books_list)
books.get('/:id', book_details)
books.get('/:id/update', book_update_get)
books.post('/:id/update', book_update_post)
books.get('/:id/delete', book_delete)

export {books}