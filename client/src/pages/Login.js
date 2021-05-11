import React,{useState} from 'react'
import {Button, Form} from 'semantic-ui-react'
import {gql} from 'graphql-tag'
import {useMutation} from 'react-apollo'
import {Helmet} from 'react-helmet';
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
            <Form onSubmit={onSubmit} className={loading ? 'loading': ''}>
               <h1>Login</h1>
               <Form.Input  label="Username" placeholder="username" name="username" type="text" value={values.username} onChange={onchange} error={errors.username ? true : false}/>
               <Form.Input label="Password" placeholder="password" name="password" type="password" value={values.password} onChange={onchange} error={errors.password ? true : false}/>
               <Button type="submit" primary>Login</Button>
           </Form>
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