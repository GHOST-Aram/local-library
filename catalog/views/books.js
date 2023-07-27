import { asynchHandler } from "../../zghost/app/init.js";
import { Author } from "../models/author.js";
import { Genre } from "../models/genre.js";

export const books_create = asynchHandler(async( req, res) => {
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