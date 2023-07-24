import { asynchHandler } from "../../zghost/app/init.js";
import { Book } from "../models/book.js";

export const bookinstance_create_get = asynchHandler(async(req, res) =>{
    const books = await Book.find().exec()
    const context = {
        title: 'Create Book Instance',
        books
    }

    res.render('catalog/book-instance-create', context)
})