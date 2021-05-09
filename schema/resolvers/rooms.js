const Room = require('../../models/room')
const checkAdmin = require('../../util/check-admin')
const checkAuth = require('../../util/check-auth')
const { AuthenticationError } = require('apollo-server')
const room = require('../../models/room')
module.exports = {
    Query:{
        async getRooms(){
            try{
                const rooms = await Room.find()
                return rooms
            }
            catch(err){
                throw new Error(err)
            }
        },
        async getRoom(_,{roomId}){
            try{
                const room = await Room.findById(roomId)
                return room
            }
            catch(err){
                throw new Error(err)
            }
        }
    },
    Mutation:{
        async createRoom(_,{name},context){
            const user = checkAdmin(context)
            if(name.trim()===''){
                throw new Error('name cannot be empty')
            }
            const room = new Room({
                name:name,
                createdAt: new Date().toISOString()
            })
            await room.save()
            return room;
        },
        async deleteRoom(_,{roomId},context){
            const user = checkAdmin(context)
                const room = await Room.findById(roomId)
                if(room){
                console.log(room.name)
                await room.delete()
                return 'Room deleted successfully'
            }
            else{
                throw new Error('Room not found')
            }
        },
        async addQuestion(_,{questionInput:{roomId,name,description,answer}},context){
            const user = checkAdmin(context)
            const room = await Room.findById(roomId)
            if(room){
                room.questions.unshift({
                    name,
                    description,
                    answer
                })
                await room.save()
                return room
            }
            else throw new Error('room not found')
        },
        async deleteQuestion(_,{roomId,questionId},context){
            const user = checkAdmin(context)
            const room = await Room.findById(roomId)
            if(room){
                const questionindex = await room.questions.findIndex(q => q.id===questionId)
                room.questions.splice(questionindex,1)
                await room.save()
                return room
            }
            else{
                throw new Error('Room not found')
            }
        },
        async addusertoroom(_,{roomId},context){
            const {username} = checkAuth(context)
            const room = await Room.findById(roomId)
            if(room){
                room.users.unshift({
                    username
                })
                await room.save()
                return room
            }
            else{
                throw new Error('Room not found')
            }
        }
    }
}