import { asynchHandler } from "../../zghost/app/init.js";
import { BookInstance } from "../models/book-instance.js";
import { Book } from "../models/book.js";
import { render, redirect } from "../../zghost/utils/http-response.js";

export const bookinstance_create_get = asynchHandler(async(req, res) =>{
    const books = await Book.find().exec()

    render(res, 'catalog/book-instance-create', {
        title: 'Create Book Instance', books
    })
})

export const bookinstance_create_post = asynchHandler(async(req, res)=>{
    const bookinstance = new BookInstance({
        book: req.body.book,
        imprint: req.body.imprint,
        status: req.body.status,
        due_back: req.body.due_back
    })
    await bookinstance.save()

    redirect(res, '/catalog/bookinstances/list')
})

export const bookinstances_list = asynchHandler(async(req, res) =>{
    const bookinstances = await BookInstance.find()
                                .populate('book').exec()

    render(res, 'catalog/bookinstances-list',  {
        title: 'Book Instances List', bookinstances
    })
})

export const bookinstance_details = asynchHandler(async(req, res)=>{
    const bookinstance = await BookInstance.findById(req.params.id)
                                .populate('book')
                                .exec()

    render(res, 'catalog/bookinstance-details', {
        title: 'Book Instance Details', bookinstance
    })
})

export const bookinstance_update_get = asynchHandler(async(req, res)=>{
    const bookinstance = await BookInstance.findById(req.params.id)
                                .populate('book')
                                .exec()
    const books = await Book.find().exec()

    render(res, 'catalog/bookinstance-update', {
        title: 'Edit Book Instance Details',
        bookinstance,
        books
    })
})

export const bookinstance_update_post = asynchHandler(async(req, res) =>{
    await BookInstance.findByIdAndUpdate(req.params.id,{
        book: req.body.book,
        imprint: req.body.imprint,
        status: req.body.status,
        due_back: req.body.due_back
    }).exec()

    redirect(res, `/catalog/bookinstances/${req.params.id}`)
})

export const bookinstance_delete = asynchHandler(async(req, res) =>{
    await BookInstance.findByIdAndDelete(req.params.id)

    redirect(res, '/catalog/bookinstances/list')
})