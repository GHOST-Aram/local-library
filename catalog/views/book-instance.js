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
    const bookinstance = new BookInstance({
        book: req.body.book,
        imprint: req.body.imprint,
        status: req.body.status,
        due_back: req.body.due_back
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

export const bookinstance_update_get = asynchHandler(async(req, res)=>{
    const bookinstance = await BookInstance.findById(req.params.id)
                                .populate('book')
                                .exec()
    const books = await Book.find().exec()
    const context = {
        title: 'Edit Book Instance Details',
        bookinstance,
        books
    }

    res.render('catalog/bookinstance-update', context)
})

export const bookinstance_update_post = asynchHandler(async(req, res) =>{
    await BookInstance.findByIdAndUpdate(req.params.id,{
        book: req.body.book,
        imprint: req.body.imprint,
        status: req.body.status,
        due_back: req.body.due_back
    })

    res.redirect(`/catalog/bookinstances/${req.params.id}`)
})