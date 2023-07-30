import { ModelSchema, Model } from "../../zghost/db/model.js";

const userSchema = new ModelSchema({
    username: String,
    password: String,
})

export const User = new Model('User', userSchema)