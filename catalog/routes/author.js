import { router as authors} from "../../zghost/app/init.js";
import * as author from "../views/author.js";


authors.get('/create', author.author_create_get)
authors.post('/create', author.author_create_post)
authors.get('/list', author.authors_list)
authors.get('/:id', author.author_details)
authors.get('/:id/update', author.author_update_get)
authors.post('/:id/update', author.author_update_post)
authors.get('/:id/delete', author.author_delete)

export {authors}