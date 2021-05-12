import React,{useContext,useState} from 'react'
import {Button, Form} from 'semantic-ui-react'
import {gql} from 'graphql-tag'
import {useMutation} from 'react-apollo'
import {AuthContext} from '../context/auth'
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
     return(
         <div>
            <Form onSubmit={onSubmit} className={loading ? 'loading': ''}>
               <h1>Register</h1>
               <Form.Input  label="username" placeholder="username.." name="username" type="text" value={values.username} onChange={onchange} error={errors.username ? true : false}/>
               <Form.Input  label="Email" placeholder="Email.." name="email" type="email" value={values.email} onChange={onchange} error={errors.email ? true : false}/>
               <Form.Input label="password" placeholder="Password.." name="password" type="password" value={values.password} onChange={onchange} error={errors.password ? true : false}/>
              <Form.Input label="confirmpassword" placeholder="confirm password.." type="password" name="confirmpassword" value={values.confirmpassword} onChange={onchange} error={errors.confirmpassword ? true : false}/>
               <Button type="submit" primary>Register</Button>
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