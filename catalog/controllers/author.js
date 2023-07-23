import { 
    asynchHandler, 
    body, 
    validationResult 
} from "../../zghost/app/init.js"
import { DB_URI } from "../../setting.js"
import { Database } from "../../zghost/db/database.js"
import { Author } from "../models/author.js"
import mongoose from "mongoose"


export const author_create_get = (req, res) =>{
    res.render('catalog/author-create', { title: 'Create Author'})
}

export const author_create_post = (req, res) =>{

    const body = req.body

    const author = new Author({
        first_name: body.first_name,
        last_name: body.last_name,
        date_of_birth: body.date_of_birth,
        date_of_death: body.date_of_death
    })

    author.save().then(result => {
        console.log(result)
        res.redirect('/')
    }).catch(error => console.error(err))
        
}