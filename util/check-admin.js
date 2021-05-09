const { AuthenticationError } = require('apollo-server')
const jwt = require('jsonwebtoken')
const dotenv  = require('dotenv')
dotenv.config()

module.exports = (context)=>{
    const authHeader = context.req.headers.authorization
    if(authHeader){
        const token = authHeader.split('Bearer ')[1]
        if(token){
            const user = jwt.verify(token,process.env.secret)
            try {
                const user = jwt.verify(token, process.env.secret);
                if(user.username=='Alpha_2018'){
                    return user
                }
                else{
                    throw new AuthenticationError('You are not admin')
                }
              } catch (err) {
                throw new AuthenticationError('Invalid/Expired token');
              }
        }
        else{
            throw new AuthenticationError('Not Authorized user')
        }
    }
    else{
        throw new AuthenticationError('You are not authorized ')
    }
}