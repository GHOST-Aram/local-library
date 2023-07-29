import { router as bookinstances } from "../../zghost/app/init.js"
import * as bookinstance from '../views/book-instance.js'


bookinstances.get('/create', bookinstance.bookinstance_create_get)
bookinstances.post('/create', bookinstance.bookinstance_create_post)
bookinstances.get('/list', bookinstance.bookinstances_list)
bookinstances.get('/:id', bookinstance.bookinstance_details)
bookinstances.get('/:id/update', bookinstance.bookinstance_update_get)
bookinstances.post('/:id/update', bookinstance.bookinstance_update_post)
bookinstances.get('/:id/delete', bookinstance.bookinstance_delete)

export {bookinstances}