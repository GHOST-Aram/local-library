import { asynchHandler } from "../../zghost/app/init.js";
import { Author } from "../models/author.js";
import { Book } from "../models/book.js";
import { Genre } from "../models/genre.js";
import { redirect, render } from "../../zghost/utils/http-response.js";

export const books_create_get = asynchHandler(async( req, res) => {
    const [authors, genres] = await Promise.all([
        Author.find().exec(), Genre.find().exec()
    ])
    
    render(res, 'catalog/book-create',  { 
        title: 'Create New Book',
        authors,
        genres
    })
})

export const books_create_post = asynchHandler(async(req, res) =>{

    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        isbn: req.body.isbn,
        genre: req.body.genre
    })

    await book.save()

    redirect(res, '/catalog/books/create')
})

export const books_list = asynchHandler(async(req, res) =>{
    const books = await Book.find().exec()
    
    render(res, 'catalog/books-list', {
         title: 'Books List', books
    })
})

export const book_details = asynchHandler(async(req, res) =>{
    const book = await Book.findById(req.params.id)
                        .populate('author')
                        .populate('genre')
                        .exec()

    render(res, 'catalog/book-details.ejs', { 
        title: 'Book Details', book
    })
})

export const book_update_get = asynchHandler(async(req, res) =>{
    const [authors, genres, book] = await Promise.all([
        Author.find().exec(), 
        Genre.find().exec(),
        Book.findById(req.params.id)
            .populate('author')
            .populate('genre')
            .exec()
    ])
  
    render(res, 'catalog/book-update', { 
        title: 'Edit Book', 
        book,
        authors,
        genres
    })
})

export const book_update_post = asynchHandler(async(req, res) =>{
    await Book.findByIdAndUpdate(req.params.id,{
            title: req.body.title,
            author: req.body.author,
            isbn: req.body.isbn,
            genre: req.body.genre
        }
    )

    redirect(res, `/catalog/book/${req.params.id}`)
})
export const book_delete = asynchHandler(async(req, res) =>{
    await Book.findByIdAndDelete(req.params.id).exec()
    
    redirect(res, '/catalog/books/list')
})