import { Schema, model } from "../app/init.js";

export class ModelSchema extends Schema{}
export class Model{
    constructor(identifier, modelSchema){
        return model(identifier, modelSchema)
    }
}