import { router } from "../../zghost/app/init.js";
import { 
    author_create_get, 
    author_create_post,
    authors_list 
} from "../controllers/author.js";

router.get('/create', author_create_get)
router.post('/create', author_create_post)
router.get('/list', authors_list)

export {router}