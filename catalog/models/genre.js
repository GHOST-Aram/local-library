import { ModelSchema, Model } from "../../zghost/db/model.js";


const genreSchema = new ModelSchema({
    name: String
})

export const Genre = new Model('Genre', genreSchema)