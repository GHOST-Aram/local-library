import { asynchHandler } from "../../zghost/app/init.js";
import { Genre } from "../models/genre.js";


export const genre_create_get = (req, res) =>{
    res.render('catalog/genre-create',{ 
        title: 'Create Genre',
        heading: 'Create New Genre'
    })
}

export const genre_create_post = asynchHandler(async(req, res) =>{
    const genre = new Genre({
         name: req.body.name,
         description: req.body.description,
         origin: req.body.origin
        })

    await genre.save()
    res.redirect('/catalog/genres/list')
       
})

export const genre_list = asynchHandler(async(req, res) =>{
    const genres = await Genre.find().exec()

    res.render('catalog/genre-list', { title: 'Genre List', genres})
})

export const genre_update_get = asynchHandler(async(req, res) =>{
    const genre = await Genre.findById(req.params.id).exec()
    const context = {
        title: 'Edit Genre',
        genre
    }

    res.render('catalog/genre-create', context)
})

export const genre_update_post = asynchHandler(async(req, res) =>{
    await Genre.findByIdAndUpdate(
        req.params.id, { name: req.body.name }
    )

    res.redirect('/catalog/genres/list')
})

export const genre_delete = asynchHandler(async(req, res) =>{
    await Genre.findByIdAndDelete(req.params.id)
    res.redirect('/catalog/genres/list')
})

