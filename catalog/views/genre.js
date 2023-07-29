import { asynchHandler } from "../../zghost/app/init.js";
import { Book } from "../models/book.js";
import { Genre } from "../models/genre.js";
import { redirect, render } from "../../zghost/utils/http-response.js";


export const genre_create_get = (req, res) =>{
    render(res, 'catalog/genre-create',{ 
        title: 'Create Genre', heading: 'Create New Genre'
    })
}

export const genre_create_post = asynchHandler(async(req, res) =>{
    const genre = new Genre({
         name: req.body.name,
         description: req.body.description,
         origin: req.body.origin
        })
    await genre.save()

    redirect(res, '/catalog/genres/list')
       
})

export const genre_delete = asynchHandler(async(req, res) =>{
    const linkedBooks = await Book.find({genre: req.params.id})
    
    if(linkedBooks.length > 0){
        res.send('Cannot delete')
    }else{
        await Genre.findByIdAndDelete(req.params.id)

        redirect(res, '/catalog/genres/list')
    }
})

export const genre_details = asynchHandler(async(req, res) =>{
    const genre = await Genre.findById(req.params.id)

    render(res, 'catalog/genre-details',{
        title: 'Genre Details', genre
    })
})
export const genre_list = asynchHandler(async(req, res) =>{
    const genres = await Genre.find().exec()

    render(res, 'catalog/genre-list', { 
        title: 'Genre List', genres
    })
})

export const genre_update_get = asynchHandler(async(req, res) =>{
    const genre = await Genre.findById(req.params.id).exec()

    render(res, 'catalog/genre-update', {
        title: 'Edit Genre', genre
    })
})

export const genre_update_post = asynchHandler(async(req, res) =>{
    await Genre.findByIdAndUpdate(
        req.params.id, { 
            name: req.body.name,
            description: req.body.description,
            origin: req.body.origin 
        }
    )

    redirect(res, '/catalog/genres/list')
})



