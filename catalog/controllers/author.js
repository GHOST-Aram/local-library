import { 
    asynchHandler, 
    body, 
    validationResult 
} from "../../zghost/app/init.js"
import { DB_URI } from "../../setting.js"
import { Database } from "../../zghost/db/database.js"
import { Author } from "../models/author.js"


export const author_create_get = (req, res) =>{
    res.render('catalog/author-create', { title: 'Create Author'})
}

export const author_create_post = [
    body('first_name')
        .trim().isLength({ min: 1})
        .escape().withMessage('First name must be specified')
        .isAlphanumeric()
        .withMessage('First name has non-alphanumeric characeters'),
    
    body('last_name')
        .trim().isLength({ min: 1 })
        .escape().withMessage('First name must be specified')
        .isAlphanumeric()
        .withMessage('Last name has non-alphanumeric characters'),

    body('date_of_birth')
        .optional({ values: 'falsy' })
        .isISO8601()
        .toDate(),

    body('date_of_death')
        .optional({ values: 'falsy' })
        .isISO8601()
        .toDate()
    ,
    asynchHandler(async(req, res) =>{
        const db = new Database()
        await db.connectToDB(DB_URI)

        const validationErrors = validationResult(req)
        const body = req.body

        const author = new Author({
            first_name: body.first_name,
            last_name: body.last_name,
            date_of_birth: body.date_of_birth,
            date_of_death: body.date_of_death
        })

        if(!validationErrors.isEmpty()){
            res.render('author-create', {
                title: 'Author Create',
                author: author,
                errors: validationErrors.array()
            })
            return
        } else {
            await author.save()
            res.redirect(author.url)
        }
    })
]