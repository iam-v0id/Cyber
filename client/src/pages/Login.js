import React,{useState} from 'react'
import { Grid, Paper, TextField } from '@material-ui/core';
import {Button, Form, Item} from 'semantic-ui-react'
import {gql} from 'graphql-tag'
import {useMutation} from 'react-apollo'
import './Login.css'
function Login(props){
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
             console.log(result)
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
     
     return(
         
         <div className="loginpage">
             <div>
             <img src="C:\Users\wasim\Desktop\Cyber\client\src\pages\Club LOGO_bg.png" width='60vh' height='100vh'/>
             </div>
             <h2>For H4ck3r5</h2>
            <div>
            <Grid className="panestyle">
            <Paper elevation={10} className="paperStyle">
            <Grid container spacing={0} justify='center' alignItems='center' direction='column'>
            <h2 >Sign In/Sign Up</h2>
            </Grid>
            <TextField label='Username' placeholder='Enter Username' fullWidth required />
            <TextField label='Password' placeholder='Enter Password' fullWidth required/>
            <Button variant='contained' type='submit' color='primary' >Sign In</Button>
          </Paper>
        </Grid>
            {/*<Form onSubmit={onSubmit} className={loading ? 'loading': ''}>
               <h1 className="loginh1">Login</h1>
               <Form.Input  className="loginuser" label="Username" placeholder="username" name="username" type="text" value={values.username} onChange={onchange} error={errors.username ? true : false}/>
               <Form.Input className="loginpass" label="Password" placeholder="password" name="password" type="password" value={values.password} onChange={onchange} error={errors.password ? true : false}/>
               <center>
               <Button class="text-center" type="submit" primary>Login</Button>
                   </center>
     </Form>*/}
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