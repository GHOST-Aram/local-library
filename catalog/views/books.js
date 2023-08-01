import { asynchHandler } from "../../zghost/app/init.js";
import { Author } from "../models/author.js";
import { Book } from "../models/book.js";
import { db } from "../../zghost/utils/database.js";
import { Genre } from "../models/genre.js";
import { redirect, render } from "../../zghost/utils/http-response.js";

export const books_create_get = asynchHandler(async( req, res) => {
    const [authors, genres] = await db.executeBatchQuery([
        db.findAll(Author), db.findAll(Genre)
    ])
    
    render(res, 'catalog/book-create',  { 
        title: 'Create New Book',
        authors,
        genres
    })
})

export const books_create_post = asynchHandler(async(req, res) =>{
    await db.create(Book, {
        title: req.body.title,
        author: req.body.author,
        isbn: req.body.isbn,
        genre: req.body.genre
    })

    redirect(res, '/catalog/books/list')
})

export const books_list = asynchHandler(async(req, res) =>{
    const books = await db.findAll(Book)
    
    render(res, 'catalog/books-list', {
         title: 'Books List', books
    })
})

export const book_details = asynchHandler(async(req, res) =>{
    const book = await db.findByIdAndPopulate(
        Book, req.params.id, ['author', 'genre']
    )


    render(res, 'catalog/book-details.ejs', { 
        title: 'Book Details', book
    })
})

export const book_update_get = asynchHandler(async(req, res) =>{
    const [authors, genres, book] = await db.executeBatchQuery([
        db.findAll(Author), 
        db.findAll(Genre),
        db.findByIdAndPopulate(Book, req.params.id, ['author', 'genre'])
    ])
  
    render(res, 'catalog/book-update', { 
        title: 'Edit Book', 
        book,
        authors,
        genres
    })
})

export const book_update_post = asynchHandler(async(req, res) =>{
    await db.findByIdAndUpdate(Book, req.params.id,{
            title: req.body.title,
            author: req.body.author,
            isbn: req.body.isbn,
            genre: req.body.genre
        }
    )

    redirect(res, `/catalog/book/${req.params.id}`)
})
export const book_delete = asynchHandler(async(req, res) =>{
    await db.findByIdAndDelete(Book, req.params.id)

    redirect(res, '/catalog/books/list')
})