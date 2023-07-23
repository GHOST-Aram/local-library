import { Author } from "../models/author.js"


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

export const authors_list = (req, res) =>{
    Author.find().then(authors =>{

        res.render('catalog/authors-list', 
            { authors: authors, title: 'Authors List'}
        )
    })
}