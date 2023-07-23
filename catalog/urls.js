import { index } from './controllers/index.js'
import { router } from '../zghost/app/init.js'
import { router as author } from './routes/author.js'


router.get('/', index)
router.use('/authors', author)

export {router}