import { ModelSchema } from "../../zghost/db/model";

const bookinstance = new ModelSchema({
    book: {
        type: ModelSchema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    imprint: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['Available', 'Maintenance', 'Loaned', 'Reserved'],
        default: 'Maintenance'
    },
    due_back:{
        type: Date,
        default: Date.now()
    }
})

bookinstance.virtual('url').get(function(){
    return `/catalog/bookinstances/${this._id}`
})

export const BookInstance = new Model('BookInstance', bookinstance)