import { Author } from "../models/author.js"
import { asynchHandler } from "../../zghost/app/init.js"
import { db } from "../../zghost/db/database.js"
import { render, redirect } from "../../zghost/utils/http-response.js"



export const author_create_get = (req, res) =>{
    render(res, 'catalog/author-create', { 
        title: 'Create Author', heading: 'Create new Author'
    })
}

export const author_create_post = asynchHandler(async(req, res) =>{

    await db.create(Author, {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        date_of_birth: req.body.date_of_birth,
        date_of_death: req.body.date_of_death
    })

    redirect(res, '/catalog/authors/list') 
})

export const authors_list = asynchHandler(async(req, res) =>{
    const authors =  await db.findAll(Author)

    render(res, 'catalog/authors-list', { 
        authors: authors, title: 'Authors List'
    })

})

export const author_details = asynchHandler(async(req, res) =>{
    const author = await db.findById(Author, req.params.id)
   
    render(res, 'catalog/author-details', {
        title: 'Author Details', author
    })
})

export const author_update_get = asynchHandler(async(req, res) =>{
    const author = await db.findById(Author, req.params.id)

    render(res, 'catalog/author-update',  {
        title: 'Edit Author',
        author,
        heading: 'Edit Author Details'
    })
})

export const author_update_post = asynchHandler(async(req, res) =>{
    await db.findByIdAndUpdate(Author, req.params.id,{
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        date_of_birth: req.body.date_of_birth,
        date_of_death: req.body.date_of_death
    })

    redirect(res, `/catalog/authors/${req.params.id}`)
})

export const author_delete = asynchHandler(async(req, res) =>{
    await db.findByIdAndDelete(Author, req.params.id)

    redirect(res, '/catalog/authors/list')
})