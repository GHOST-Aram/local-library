import { asynchHandler } from "../../zghost/app/init.js";
import { Author } from "../models/author.js";
import { Book } from "../models/book.js";
import { BookInstance } from "../models/book-instance.js";
import { db } from "../../zghost/db/database.js";
import { Genre } from '../models/genre.js'
import { render } from "../../zghost/utils/http-response.js";


export const index = asynchHandler(async(req, res) =>{
    const [
        numAuthors,
        numBooks,
        numGenres,
        numBookInstances
    ] = await db.executeBatchQuery([
        db.countDocuments(Author),
        db.countDocuments(Book),
        db.countDocuments(Genre),
        db.countDocuments(BookInstance)
    ])
    
    render(res, 'catalog/index', { 
        title: 'Home', 
        numAuthors, 
        numGenres,
        numBooks,
        numBookInstances 
    });
})

