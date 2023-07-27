import { Author } from "../models/author.js";
import { Genre } from '../models/genre.js'
import { asynchHandler } from "../../zghost/app/init.js";


export const index = asynchHandler(async(req, res) =>{
    const numAuthors = await Author.countDocuments({}).exec()
    const numGenres = await Genre.countDocuments({}).exec()
    
        
    res.render('catalog/index', { title: 'Home', numAuthors, numGenres });
})

