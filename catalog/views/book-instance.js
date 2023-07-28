import { asynchHandler } from "../../zghost/app/init.js";
import { Book } from "../models/book.js";
import { BookInstance } from "../models/book-instance.js";
import { db } from "../../zghost/db/database.js";
import { render, redirect } from "../../zghost/utils/http-response.js";
import { validator } from "../../zghost/utils/validation.js";
import { validationResult } from "../../zghost/app/init.js";

export const bookinstance_create_get = asynchHandler(async(req, res) =>{
    const books = await db.findAll(Book)

    render(res, 'catalog/book-instance-create', {
        title: 'Create Book Instance', 
        books,
        errors:null
    })
})

export const bookinstance_create_post = [
    validator.validatePlainText('book'),
    validator.validatePlainText('imprint'),
    validator.validatePlainText('status'),
    validator.validateDate('due_back'),

    asynchHandler(async(req, res)=>{
        const errors = validationResult(req)

        const bookinstance = new BookInstance({
            book: req.body.book,
            imprint: req.body.imprint,
            status: req.body.status,
            due_back: req.body.due_back
        })
        
        if(!errors.isEmpty()){//re-render creation form with errors
            const books = await db.findAll(Book)

            render(res, 'catalog/book-instance-create', {
                title: 'Create Book Instance', 
                books,
                errors
            })
        } else{
            await db.save(bookinstance)
            redirect(res, '/catalog/bookinstances/list')
        }
    })
]

export const bookinstances_list = asynchHandler(async(req, res) =>{
    const bookinstances = await db.findAllAndPopulate(
        BookInstance, ['book']
    )

    render(res, 'catalog/bookinstances-list',  {
        title: 'Book Instances List', bookinstances
    })
})

export const bookinstance_details = asynchHandler(async(req, res)=>{
    const bookinstance = await db.findByIdAndPopulate(
        BookInstance, req.params.id, ['book']
    )
                                
    render(res, 'catalog/bookinstance-details', {
        title: 'Book Instance Details', bookinstance
    })
})

export const bookinstance_update_get = asynchHandler(async(req, res)=>{
    const bookinstance = await db.findByIdAndPopulate(
        BookInstance, req.params.id, ['book']
    )
    const books = await Book.find().exec()

    render(res, 'catalog/bookinstance-update', {
        title: 'Edit Book Instance Details',
        bookinstance,
        books
    })
})

export const bookinstance_update_post = asynchHandler(async(req, res) =>{
    await db.findByIdAndUpdate(BookInstance,req.params.id,{
        book: req.body.book,
        imprint: req.body.imprint,
        status: req.body.status,
        due_back: req.body.due_back
    })

    redirect(res, `/catalog/bookinstances/${req.params.id}`)
})

export const bookinstance_delete = asynchHandler(async(req, res) =>{
    await db.findByIdAndDelete(BookInstance, req.params.id)

    redirect(res, '/catalog/bookinstances/list')
})