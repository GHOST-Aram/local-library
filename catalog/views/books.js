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