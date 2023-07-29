import { router as books } from "../../zghost/app/init.js"
import * as book from '../views/books.js'


books.get('/create', book.books_create_get)
books.post('/create', book.books_create_post)
books.get('/list', book.books_list)
books.get('/:id', book.book_details)
books.get('/:id/update', book.book_update_get)
books.post('/:id/update', book.book_update_post)
books.get('/:id/delete', book.book_delete)

export {books}