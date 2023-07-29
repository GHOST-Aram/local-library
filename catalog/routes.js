import { index } from './views/index.js'
import { router as catalog } from '../zghost/app/init.js'
import { genres } from './routes/genre.js'
import { books } from './routes/books.js'
import { authors } from './routes/author.js'
import { bookinstances } from './routes/book-instance.js'

catalog.get('/', index)
catalog.use('/genres', genres)
catalog.use('/books', books)
catalog.use('/authors', authors)
catalog.use('/bookinstances', bookinstances)

export { catalog }