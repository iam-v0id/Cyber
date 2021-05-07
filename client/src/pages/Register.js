import React,{useState} from 'react'
import {Button, Form} from 'semantic-ui-react'
import {gql} from 'graphql-tag'
import {useMutation} from '@apollo/react-hooks'
function Register(){
    const [errors,seterrors] = useState({})
    const [values,setvalues] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const onChange = (event)=>{
        setvalues({...values,[event.target.name]:event.target.value})
    }
    const [addUser,{loading}] = useMutation(
        REGISTER_USER,{update(proxy,result){
            console.log(result)
        },
        onError(err){
            console.log(err&&err.graphQLErrors[0]?err.graphQLErrors[0].extensions.exception.errors:{})
            seterrors(err&&err.graphQLErrors[0]?err.graphQLErrors[0].extensions.exception.errors:{})
        },
        variables : values
      })
    const onSubmit = (event)=>{
        event.preventDefault()
        addUser()
    }
    
    
    return(
        <div>
           <Form onSubmit={onSubmit} noValidate className={loading? 'loading': ''}>
               <h1>Register</h1>
               <Form.Input label="username" placeholder="username.." name="username" value={values.username} onChange={onChange}/>
               <Form.Input label="Email" placeholder="Email.." name="email" value={values.email} onChange={onChange}/>
               <Form.Input label="password" placeholder="Password.." name="password" value={values.password} onChange={onChange}/>
               <Form.Input label="confirmPassword" placeholder="confirm password.." name="comfirmPassword" value={values.confirmpassword} onChange={onChange}/>
               <Button type="submit" primary>Register</Button>
           </Form>
         {Object.keys(errors).length > 0 && (   <div className="ui error message">
               <ul className="list">
                   {Object.values(errors).map(value=>(
                       <li key={value}>{value}</li>
                   ))}
               </ul>
           </div>)}
        </div>
    )
}

const REGISTER_USER =gql`
mutation register(
    $username : String!
    $email : String!
    $password: String!
    $confirmPassword: String!
){
    register(
        registerInput:{
            username: $username
            email: $email
            password: $password
            confirmPassword : $confirmPassword
        }
    )
    {
            id email username createdAt token
        }
}
`
export default Register