import { index } from './controllers/index.js'
import { router } from '../zghost/app/init.js'
import { 
    author_create_get, 
    author_create_post,
    authors_list 
} from "./controllers/author.js";


router.get('/', index)
router.get('/genres/create', (req, res) =>{
    console.log('Genre create')
    res.render('catalog/genre-create',{ title: 'Create Genre'})
})

router.get('/authors/create', author_create_get)
router.post('/authors/create', author_create_post)
router.get('/authors/list', authors_list)

export {router}