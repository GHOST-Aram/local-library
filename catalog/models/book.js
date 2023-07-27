import { ModelSchema, Model } from "../../zghost/db/model.js";

const bookSchema = new ModelSchema({
    title: { 
        type: String, 
        required: true
    },
    author: {
        type: ModelSchema.Types.ObjectId, 
        ref: 'Author',
        required: true
    },
    isbn: { 
        type: String, 
        maxlength: 13, 
        minlength: 13,
        required: true
    },
    genre: [{
        type: ModelSchema.Types.ObjectId,
        ref: 'Genre'
    }]
})

bookSchema.virtual('url').get(function(){
    return `/catalog/book/${this._id}`
})

export const Book = new Model('Book', bookSchema)