import React,{useContext,useState} from 'react'
import { Grid, Paper, TextField,Button,Box } from '@material-ui/core';
import {gql} from 'graphql-tag'
import {useMutation} from 'react-apollo'
import {AuthContext} from '../context/auth'
import './Login.css'
function Login(props){
     const context = useContext(AuthContext)
      const [errors,setErrors] = useState({})
     const [values,setValues] = useState({
         username: '',
         password: '',
     })
     const onchange = (event)=>{
        setValues({...values,[event.target.name]:event.target.value})
     }
     const onSubmit = (event)=>{
         loginuser()
     }
     const [loginuser,{loading}] = useMutation(LOGIN_USER,{
         update(_,result){
            context.login(result.data.login)
             props.history.push('/')
         },
         onError(err){
             setErrors(err&&err.graphQLErrors[0]?err.graphQLErrors[0].extensions.exception.errors:{})
         }
         ,
         variables: {
             username: values.username,
             password: values.password
         }
     })
     const loginpage={}
     const btStyle={margin:"2px 2px 20px 5px",maxWidth: '70px', maxHeight: '30px', minWidth: '70px', minHeight: '30px'};
     return(
         <body id="body">
         <div className="loginpage">
            <img src="https://i.ibb.co/dK3MzhN/LOGO-3.png" className="imgstyle"/>
            <h2 className="loginh2-1">For H4ck3r5</h2>
            <div> 
            <Grid className="panestyle">
            <Paper elevation={10} className="paperStyle">
            <Grid container spacing={0} justify='center' alignItems='center' direction='column'>
            <h2 className="loginh2-2">Login</h2>
            </Grid>
            <TextField className="loginuser" label="Username" placeholder="username" name="username" type="text" value={values.username} onChange={onchange} error={errors.username ? true : false} fullWidth required />
            <TextField className="loginpass" label="Password" placeholder="password" name="password" type="password" value={values.password} onChange={onchange} error={errors.password ? true : false} fullWidth required/>
            <Box textAlign='center'>
            <Button variant='contained' type='submit' color='primary' onClick={onSubmit} style={btStyle}>Login</Button>
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
           </div>
           </body>
     )
}

const LOGIN_USER =gql`
mutation login(
    $username : String!,
    $password: String!  
){
    login(
            username: $username,
            password: $password
    )
    {
            id email username createdAt token
        }
}
`
export default Login