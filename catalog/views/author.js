import { asynchHandler } from "../../zghost/app/init.js"
import { Author } from "../models/author.js"



export const author_create_get = (req, res) =>{
    res.render('catalog/author-create', 
    { 
        title: 'Create Author',
        heading: 'Create new Author'
    })
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

export const authors_list = (req, res) =>{
    Author.find().then(authors =>{

        res.render('catalog/authors-list', 
            { authors: authors, title: 'Authors List'}
        )
    })
}

export const author_details = asynchHandler(async(req, res) =>{
    const author = await Author.findById(req.params.id).exec()
    const context = {
        title: 'Author Details',
        author
    }
    res.render('catalog/author-details', context)
})

export const author_update_get = asynchHandler(async(req, res) =>{
    const author = await Author.findById(req.params.id).exec()
    const context = {
        title: 'Edit Author',
        author,
        heading: 'Edit Author Details'
    }
    res.render('catalog/author-update', context)
})

export const author_update_post = asynchHandler(async(req, res) =>{
    const incoming = req.body
    await Author.findByIdAndUpdate(req.params.id,{
        first_name: incoming.first_name,
        last_name: incoming.last_name,
        date_of_birth: incoming.date_of_birth,
        date_of_death: incoming.date_of_death
    })

    res.redirect(`/catalog/authors/${req.params.id}`)
})