import { ModelSchema, Model } from "../../zghost/db/model.js";


const genreSchema = new ModelSchema({
    name: String,
    description:{
        type: String,
        minlength: 50,
        maxlength: 500,
        required: true
    },
    origin: String
})

export const Genre = new Model('Genre', genreSchema)