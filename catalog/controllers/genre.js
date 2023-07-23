import { Genre } from "../models/genre.js";


export const genre_create_get = (req, res) =>{
    res.render('catalog/genre-create',{ title: 'Create Genre'})
}

export const genre_create_post = (req, res) =>{
    const data = req.body
    const genre = new Genre({ name: data.name})

    genre.save().then(result =>{
        console.log(result)
        res.redirect('/')
    })    
}

