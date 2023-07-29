import { asynchHandler } from "../../zghost/app/init.js"
import { Author } from "../models/author.js"
import { render, redirect } from "../../zghost/utils/http-response.js"



export const author_create_get = (req, res) =>{
    render(res, 'catalog/author-create', { 
        title: 'Create Author', heading: 'Create new Author'
    })
}

export const author_create_post = asynchHandler(async(req, res) =>{

    const body = req.body

    const author = new Author({
        first_name: body.first_name,
        last_name: body.last_name,
        date_of_birth: body.date_of_birth,
        date_of_death: body.date_of_death
    })
    await author.save()

    redirect(res, '/catalog/authors/list') 
})

export const authors_list = asynchHandler(async(req, res) =>{
    const authors =  await Author.find().exec()

    render(res, 'catalog/authors-list', { 
        authors: authors, title: 'Authors List'
    })

})

export const author_details = asynchHandler(async(req, res) =>{
    const author = await Author.findById(req.params.id).exec()
   
    render(res, 'catalog/author-details', {
        title: 'Author Details', author
    })
})

export const author_update_get = asynchHandler(async(req, res) =>{
    const author = await Author.findById(req.params.id).exec()

    render(res, 'catalog/author-update',  {
        title: 'Edit Author',
        author,
        heading: 'Edit Author Details'
    })
})

export const author_update_post = asynchHandler(async(req, res) =>{
    const incoming = req.body
    await Author.findByIdAndUpdate(req.params.id,{
        first_name: incoming.first_name,
        last_name: incoming.last_name,
        date_of_birth: incoming.date_of_birth,
        date_of_death: incoming.date_of_death
    }).exec()

    redirect(res, `/catalog/authors/${req.params.id}`)
})

export const author_delete = asynchHandler(async(req, res) =>{
    await Author.findByIdAndDelete(req.params.id).exec()

    redirect(res, '/catalog/authors/list')
})