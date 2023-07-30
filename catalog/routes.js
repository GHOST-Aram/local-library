import { index } from './views/index.js'
import { genres } from './routes/genre.js'
import { books } from './routes/books.js'
import { authors } from './routes/author.js'
import { bookinstances } from './routes/book-instance.js'
import { Router } from 'express'

const catalog = Router()


catalog.get('/', index)
catalog.use('/authors', authors)
catalog.use('/bookinstances', bookinstances)
catalog.use('/books', books)
catalog.use('/genres', genres)

export { catalog }