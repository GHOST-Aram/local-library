import { asynchHandler, validationResult } from "../../zghost/app/init.js";
import { Book } from "../models/book.js";
import { db } from "../../zghost/db/database.js";
import { Genre } from "../models/genre.js";
import { redirect, render } from "../../zghost/utils/http-response.js";
import { compareObjectIds } from "../../zghost/utils/objects.js";
import { validator } from "../../zghost/utils/validation.js";


export const genre_create_get = (req, res) =>{
    render(res, 'catalog/genre-create',{ 
        title: 'Create Genre', 
        heading: 'Create New Genre',
        errors: null
    })
}

export const genre_create_post = [
    validator.validatePlainText('name'),
    validator.validatePlainText('description'),
    validator.validatePlainText('origin'),

    asynchHandler(async(req, res) =>{
        const validationErrors = validationResult(req)

        const genre = new Genre({
            name: req.body.name,
            description: req.body.description,
            origin: req.body.origin
        })

        if(!validationErrors.isEmpty()){
            render(res, 'catalog/genre-create',{ 
                title: 'Create Genre', 
                heading: 'Create New Genre',
                errors: validationErrors.array()
            })
        } else{
            await db.save(genre)
            redirect(res, '/catalog/genres/list')
        }
    
           
    })
]

export const genre_delete = asynchHandler(async(req, res) =>{
    const linkedGenres = await db.findWithPopulateAndFilter(
        Book, ['genre'], ['genre']
    )
    let isLinked = false
    // Search for ObjectId with same string id as request id
    linkedGenres.forEach(element => {
        element.genre.forEach(genre =>{
            if(genre._id.toString()=== req.params.id){
                isLinked = true
            }

        })
    });
    if(isLinked){
        res.send('Cannot delete')
    }else{
        await db.findByIdAndDelete(Genre, req.params.id)

        redirect(res, '/catalog/genres/list')
    }
})

export const genre_details = asynchHandler(async(req, res) =>{
    const genre = await db.findById(Genre, req.params.id)

    render(res, 'catalog/genre-details',{
        title: 'Genre Details', genre
    })
})
export const genre_list = asynchHandler(async(req, res) =>{
    const genres = await db.findAll(Genre)

    render(res, 'catalog/genre-list', { 
        title: 'Genre List', genres
    })
})

export const genre_update_get = asynchHandler(async(req, res) =>{
    const genre = await db.findById(Genre, req.params.id)

    render(res, 'catalog/genre-update', {
        title: 'Edit Genre', genre
    })
})

export const genre_update_post = asynchHandler(async(req, res) =>{
    await db.findByIdAndUpdate(Genre, req.params.id, { 
            name: req.body.name,
            description: req.body.description,
            origin: req.body.origin 
        }
    )

    redirect(res, '/catalog/genres/list')
})



