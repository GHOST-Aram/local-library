import { router } from '../../zghost/app/init.js'


router.get('/create', (req, res) =>{
    console.log('Genre create')
    res.render('catalog/genre-create',{ title: 'Create Genre'})
})

export {router}