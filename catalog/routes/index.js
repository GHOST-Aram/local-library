import { index } from '../controllers/index.js'
import { router } from '../../zghost/app/init.js'


router.get('/', index)

export {router}