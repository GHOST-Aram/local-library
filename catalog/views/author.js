import { Author } from "../models/author.js"
import { asynchHandler } from "../../zghost/app/init.js"
import { db } from "../../zghost/db/database.js"
import { render, redirect } from "../../zghost/utils/http-response.js"
import { Book } from "../models/book.js"
import { validator } from "../../zghost/utils/validation.js"
import { validationResult } from "../../zghost/app/init.js"



export const author_create_get = (req, res) =>{
    render(res, 'catalog/author-create', { 
        title: 'Create Author', 
        heading: 'Create new Author',
        errors:null
    })
}

export const author_create_post = [
    validator.validatePlainText('first_name'),
    validator.validatePlainText('last_name'),
    validator.validateDate('date_of_birth'),
    validator.validateDate('date_of_death'),

    asynchHandler(async(req, res) =>{
        
        const errors = validationResult(req)

        const author = new Author({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            date_of_birth: req.body.date_of_birth,
            date_of_death: req.body.date_of_death
        })

        if(!errors.isEmpty()){
            render(res, 'catalog/author-create', { 
                title: 'Create Author', 
                heading: 'Failed retry Create Author',
                errors: errors.array()
            })
        } else {
            await db.save(author)
            redirect(res, '/catalog/authors/list') 
        }
    })
]

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
    const linkedAuthors = await db.findWithPopulateAndFilter(
        Book, ['author'], ['author']
    )
    let isLinked = false
    // Check if islinked
    linkedAuthors.forEach(element =>{
        if(element.author._id.toString() === req.params.id)
            isLinked = true
    })
    
    if(isLinked){
        res.send('Cannot delete')
    } else{
        await db.findByIdAndDelete(Author, req.params.id)

    }

    redirect(res, '/catalog/authors/list')
})