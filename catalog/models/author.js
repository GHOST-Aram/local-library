import { ModelSchema, Model } from "../../zghost/db/model.js";

const authorSchema = new ModelSchema({
    first_name: { 
        type: String,
        required: true,
        maxlength: 100,
        minlength: 1
    },
    last_name: { 
        type: String,
        required: true,
        maxlength: 100,
        minlength: 1
    },
    date_of_birth: {
        type: Date,
        required: true,
    },
    date_of_death: {
        type: Date,
    }  
})

export const Author = new Model('Author', authorSchema)