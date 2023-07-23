import { router as authors} from "../../zghost/app/init.js";
import { 
    author_create_get, 
    author_create_post,
    authors_list 
} from "../controllers/author.js";

authors.get('/create', author_create_get)
authors.post('/create', author_create_post)
authors.get('/list', authors_list)

export {authors}