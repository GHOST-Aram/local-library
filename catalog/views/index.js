import { Author } from "../models/author.js";
import { Genre } from '../models/genre.js'
import { asynchHandler } from "../../zghost/app/init.js";
import { Book } from "../models/book.js";
import { BookInstance } from "../models/book-instance.js";
import { render } from "../../zghost/utils/http-response.js";


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
    
    render(res, 'catalog/index', { 
        title: 'Home', 
        numAuthors, 
        numGenres,
        numBooks,
        numBookInstances 
    });
})

