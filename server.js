const { ApolloServer } = require('apollo-server')
const express = require('express')
const mongoose = require('mongoose')
const typeDefs = require('./schema/typeDefs')
const resolvers = require('./schema/resolvers')
const dotenv = require('dotenv')
const app = express()
const server = new ApolloServer({typeDefs, resolvers,context:({req})=>({req})})
dotenv.config()

const url=process.env.url
//server.applyMiddleware({app})
const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
}
mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })

server.listen(4000,()=>{
    console.log("server started")
})