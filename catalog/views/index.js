import { Author } from "../models/author.js";
import { Genre } from '../models/genre.js'
import { asynchHandler } from "../../zghost/app/init.js";
import { Book } from "../models/book.js";
import { BookInstance } from "../models/book-instance.js";


export const index = asynchHandler(async(req, res) =>{
    const [
        numAuthors,
        numBooks,
        numGenres,
        numBookInstances
    ] = await Promise.all([
        Author.countDocuments().exec(),
        Book.countDocuments().exec(),
        Genre.countDocuments().exec(),
        BookInstance.countDocuments().exec()
    ])
    
    const context = { 
        title: 'Home', 
        numAuthors, 
        numGenres,
        numBooks,
        numBookInstances 
    }
    res.render('catalog/index', context);
})

