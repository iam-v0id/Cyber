const postResolvers = require('./posts')
const userResolvers = require('./users')
const commentsResolvers = require('./comments')
const roomsResolvers = require('./rooms')
module.exports = {
    Query: {
        ...postResolvers.Query,
        ...roomsResolvers.Query
    },
    Mutation:{
        ...userResolvers.Mutation,
        ...postResolvers.Mutation,
        ...commentsResolvers.Mutation,
        ...roomsResolvers.Mutation
    }
}
