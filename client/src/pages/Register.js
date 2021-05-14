import React,{useContext,useState} from 'react'
import { Grid, Paper, TextField,Button,Box } from '@material-ui/core';
import {gql} from 'graphql-tag'
import {useMutation} from 'react-apollo'
import {AuthContext} from '../context/auth'
import './Register.css'
function Register(props){
    const context  = useContext(AuthContext)
      const [errors,setErrors] = useState({})
     const [values,setValues] = useState({
         username: '',
         email: '',
         password: '',
         confirmpassword: ''
     })
     const onchange = (event)=>{
        setValues({...values,[event.target.name]:event.target.value})
     }
     const onSubmit = (event)=>{
         event.preventDefault()
         addUser()
     }
     const [addUser,{loading}] = useMutation(REGISTER_USER,{
         update(_,result){
             context.login(result)
             props.history.push('/')
         },
         onError(err){
             setErrors(err.graphQLErrors[0].extensions.exception.errors)
         }
         ,
         variables: {
             username: values.username,
             email: values.username,
             password: values.password,
             confirmpassword: values.confirmpassword
         }
     })
     const regbtStyle={margin:"2px 2px 20px 5px",maxWidth: '80px', maxHeight: '30px', minWidth: '80px', minHeight: '30px'};
     return(
         <div className="registerpage">
            <img src="https://i.ibb.co/x7zYNwL/image.png" className="regimgstyle"/>
            <h2 className="regh2-1">St4rt H4ck1ng T0d4y</h2>
             <Grid className="regpanestyle">
            <Paper elevation={10} className="regpaperStyle">
            <Grid container spacing={0} justify='center' alignItems='center' direction='column'>
            <h2 className="regh2-2">Register</h2>
            </Grid>
            <TextField className="reguser" label="Username" placeholder="Username" name="username" type="text" value={values.username} onChange={onchange} error={errors.username ? true : false} fullWidth required />
            <TextField className="regemail" label="Email" placeholder="Email" name="email" type="text" value={values.email} onChange={onchange} error={errors.email ? true : false} fullWidth required />
            <TextField className="regpass" label="Password" placeholder="Password" name="password" type="password" value={values.password} onChange={onchange} error={errors.password ? true : false} fullWidth required/>
            <TextField className="regconpass" label="Confirm Password" placeholder="Confirm Password" name="confirmpassword" type="password" value={values.confirmpassword} onChange={onchange} error={errors.confirmpassword ? true : false} fullWidth required/>
            <Box textAlign='center'>
            <Button variant='contained' type='submit' color='primary' onClick={onSubmit} style={regbtStyle}>Register</Button>
                </Box>
          </Paper>
        </Grid>
           {Object.keys(errors).length>0 && (
            <div className="ui error message">
            <ul className="list">
                {Object.values(errors).map(value=>{
                   return( <li key={value}>{value}</li>
                )
                })}
            </ul>
        </div>
           )}
           </div>
     )
}

const REGISTER_USER =gql`
mutation register(
    $username : String!,
    $email : String!,
    $password: String!,
    $confirmpassword: String!
){
    register(
        registerInput:{
            username: $username,
            email: $email,
            password: $password,
            confirmpassword : $confirmpassword
        }
    )
    {
            id email username createdAt token
        }
}
`
export default Register