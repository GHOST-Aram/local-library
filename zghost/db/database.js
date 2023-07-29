import {mongoose} from '../app/init.js'

class Database{
    
    countDocuments = async(Model) =>{
        return Model.countDocuments()
    }

    createObjectId = (textId) =>{
        return mongoose.Types.ObjectId(textId)
    }

    create = async(Model, document) =>{
        await Model.create(document)
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
    findOne = async(Model, searchDocument) =>{
        return await Model.findOne(searchDocument)
    }
    findWithPopulateAndFilter = async(Model, refrences, filters) =>{
        return await Model.find()
                    .populate(refrences.join( ' '))
                    .select(filters.join(' '))
    }
    save = async(document) =>{
        await document.save()
    }
}

export const db = new Database()