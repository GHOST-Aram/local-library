import { Author } from "../models/author.js";


export const index = (req, res) =>{
    Author.countDocuments().then(
        numAuthors => {
            res.render('catalog/index', { title: 'Home', numAuthors });
        }
    )
}

