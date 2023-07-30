import { Router } from 'express'
import * as genre from '../views/genre.js'

const genres = Router()

genres.get('/create', genre.genre_create_get)
genres.post('/create', genre.genre_create_post)
genres.get('/list', genre.genre_list)
genres.get('/:id', genre.genre_details)
genres.get('/:id/update', genre.genre_update_get)
genres.post('/:id/update',  genre.genre_update_post)
genres.get('/:id/delete', genre.genre_delete)


export {genres}