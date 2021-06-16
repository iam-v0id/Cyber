const { ApolloServer } = require('apollo-server-express')
const express = require('express')
const mongoose = require('mongoose')
const typeDefs = require('./schema/typeDefs')
const resolvers = require('./schema/resolvers')
const dotenv = require('dotenv')
const cors = require('cors')
const app = express()
const server = new ApolloServer({typeDefs, resolvers,context:({req})=>({req})})
dotenv.config()
app.use(cors())
const url=process.env.url
server.applyMiddleware({app})
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
const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log("server started at port PORT")
})
