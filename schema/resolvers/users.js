const user = require('../../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {UserInputError } = require('apollo-server-express')
const dotenv = require('dotenv')
const {validateRegisterInput,validateLogin} = require('../../util/validators')
dotenv.config()

function generateToken(user){
    return jwt.sign({
        id: user.id,
        email: user.email,
        username: user.username
    },process.env.secret,{expiresIn : '1h'})
}
module.exports = {
    Mutation: {
        async login(_, {username,password}){
            const {errors,valid} = validateLogin(username,password)
            if(!valid){
                throw new UserInputError("Errors",{errors})
            }
            const User = await user.findOne({username})
            if(!User){
                errors.general = 'User not found'
                throw new UserInputError('Wrong credentials',{errors})
            }
            const match = await bcrypt.compareSync(password,User.password)
           
           if(!match){
                errors.general = "wrong credential"
                throw new UserInputError('Wrong credentials',{errors})
            }
            const token = generateToken(User)
        
            return{
                ...User._doc,
                id:User.id,
                token
            }
        },
    async register(_,{registerInput:{username,password,confirmpassword,email}},context,info){
        const {valid,errors} = validateRegisterInput(username,password,confirmpassword,email) 
        if(!valid){
            throw new UserInputError('errors',{errors})
        }
        password = await bcrypt.hash(password,5)
         const newUser = new user({
             email,
             username,
             password,
             createdAt : new Date().toISOString()
         })
         const User = await user.findOne({username})
         if(User){
            throw new UserInputError('Username is already taken',{
                errors:{
                    username: 'this username is already taken'
                }
            })
         }
         const res =  await newUser.save()

         const token = generateToken(res)
         const decoded = jwt.verify(token,process.env.secret)
         console.log(decoded)
         return{
             ...res._doc,
             id:res.id,
             token
         }
    }    
}
}