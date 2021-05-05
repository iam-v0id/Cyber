const {model, Schema,Mongoose} = require('mongoose')
const postschema = new Schema({
    body: String,
    username: String,
    createdAt: String,
    comments: [
        {
            body: String,
            username: String,
            createdAt: String,
        }
    ],
    likes: [
        {
            username: String,
            createdAt: String,
        }
    ],
    user:{
        type: Schema.Types.ObjectId,
        ref: 'users',
    }
})

module.exports = new model('Post',postschema)