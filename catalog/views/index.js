import { Author } from "../models/author.js";
import { Genre } from '../models/genre.js'
import { asynchHandler } from "../../zghost/app/init.js";
import { Book } from "../models/book.js";


export const index = asynchHandler(async(req, res) =>{
    const numAuthors = await Author.countDocuments().exec()
    const numGenres = await Genre.countDocuments().exec()
    const numBooks = await Book.countDocuments().exec()
    
    const context = { 
        title: 'Home', 
        numAuthors, 
        numGenres,
        numBooks 
    }
    res.render('catalog/index', context);
})

