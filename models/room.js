const {model,Schema} = require('mongoose')

const roomSchema = new Schema({
    name: String,
    questions: [
        {
            name: String,
            description: String,
            answer: String,
        }
    ],
    users: [
        {
            username: String,
        }
    ]
})

module.exports = new model('Room',roomSchema)