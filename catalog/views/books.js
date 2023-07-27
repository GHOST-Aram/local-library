import { asynchHandler } from "../../zghost/app/init.js";
import { Author } from "../models/author.js";
import { Book } from "../models/book.js";
import { Genre } from "../models/genre.js";

export const books_create_get = asynchHandler(async( req, res) => {
    const [authors, genres] = await Promise.all([
        Author.find().exec(), Genre.find().exec()
    ])
    const context = { 
        title: 'Create New Book',
        authors,
        genres
    }
    res.render('catalog/book-create', context)
})

export const books_create_post = asynchHandler(async(req, res) =>{
    const incoming = req.body

    const book = new Book({
        title: incoming.title,
        author: incoming.author,
        isbn: incoming.isbn,
        genre: incoming.genre
    })

    await book.save()

    res.redirect('/catalog/books/create')
})

export const books_list = asynchHandler(async(req, res) =>{
    const books = await Book.find().exec()
    
    res.render('catalog/books-list', { title: 'Books List', books})
})

export const book_details = asynchHandler(async(req, res) =>{
    const book = await Book.findById(req.params.id)
                        .populate('author')
                        .populate('genre')
                        .exec()
    const context = { title: 'Book Details', book}
    
    res.render('catalog/book-details.ejs', context )
})

export const book_update_get = asynchHandler(async(req, res) =>{
    const [authors, genres, book] = await Promise.all([
        Author.find().exec(), Genre.find().exec(),
        Book.findById(req.params.id).exec()
    ])
  

    res.render('catalog/book-create', { 
        title: 'Edit Book', 
        book,
        authors,
        genres
    })
})