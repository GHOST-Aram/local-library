import mongoose from "mongoose"

class Database{

    countDocuments = async(Model) =>{
        return Model.countDocuments()
    }

    create = async(Model, document) =>{
        Model.create(document)
    }

    executeBatchQuery = async(queriesArray) =>{
        return await Promise.all(queriesArray)
    }

    findAll = async (Model) =>{
        return await Model.find()
    }
    
    findAllAndPopulate = async(Model, references) =>{
        return await Model.find().populate(references.join(' '))
    }

    findById = async(Model, id) =>{
        return await Model.findById(id)
    }

    findByIdAndDelete = async(Model, id) =>{
        await Model.findByIdAndDelete(id)
    }
    
    findByIdAndPopulate = async(Model, id, references) =>{
        if(!mongoose.Types.ObjectId.isValid(id)){
            throw new Error('Invalid object id')
        }
        return await Model.findById(id).populate(references.join(' '))
    }

    findByIdAndUpdate = async(Model, id, update_doc) =>{
        await Model.findByIdAndUpdate(id, update_doc)
    }
    
    save = async(document) =>{
        await document.save()
    }
}

export const db = new Database()