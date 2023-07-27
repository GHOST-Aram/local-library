import { asynchHandler } from "../../zghost/app/init.js";
import { BookInstance } from "../models/book-instance.js";
import { Book } from "../models/book.js";

export const bookinstance_create_get = asynchHandler(async(req, res) =>{
    const books = await Book.find().exec()
    const context = {
        title: 'Create Book Instance',
        books
    }

    res.render('catalog/book-instance-create', context)
})

export const bookinstance_create_post = asynchHandler(async(req, res)=>{
    const incoming = req.body
    const bookinstance = new BookInstance({
        book: incoming.book,
        imprint: incoming.imprint,
        status: incoming.status,
        due_back: incoming.due_back
    })

    await bookinstance.save()
    res.redirect('/catalog/bookinstances/create')
})

export const bookinstances_list = asynchHandler(async(req, res) =>{
    const bookinstances = await BookInstance.find()
                                .populate('book').exec()
    console.log(bookinstances[0])
    const context = {
        title: 'Book Instances List',
        bookinstances
    }
    res.render('catalog/bookinstances-list', context)
})

export const bookinstance_details = asynchHandler(async(req, res)=>{
    const bookinstance = await BookInstance.findById(req.params.id)
                                .populate('book')
                                .exec()
    const context = {
        title: 'Book Instance Details',
        bookinstance
    }

    res.render('catalog/bookinstance-details', context)
})