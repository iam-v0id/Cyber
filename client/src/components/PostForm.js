import React,{useContext,useState} from 'react'
import {Button, Form} from 'semantic-ui-react'
import { useMutation} from 'react-apollo'
import gql from 'graphql-tag'
import {FETCH_POSTS_QUERY} from '../util/graphql'
function PostForm(props){
      const [errors,setErrors] = useState({})
     const [values,setValues] = useState({
         body: ''
     })
     const onchange = (event)=>{
        setValues({...values,[event.target.name]:event.target.value})
     }
     const onSubmit = (event)=>{
         event.preventDefault()
         createPost()
     }
    const [createPost,{error}] = useMutation(CREATE_POST_MUTATION,{
        variables: values,
        update(proxy,result){
            const data=proxy.readQuery({
                query: FETCH_POSTS_QUERY
            })
            data.getPosts = [result.data.createPost,...data.getPosts]
            proxy.writeQuery({query:FETCH_POSTS_QUERY,data})
            values.body = ''
            props.history.push('/Posts')
        }
    })
    return(
        <Form onSubmit={onSubmit}>
            <h2>Create Post:</h2>
            <Form.Field>
                <Form.Input
                placeholder='Create Post'
                name='body'
                onChange={onchange}
                value={values.body}
                />
                <Button type="submit" color="teal">Create Post</Button>
            </Form.Field>
        </Form>
    )
}
const CREATE_POST_MUTATION = gql`
    mutation createPost($body: String!){
        createPost(body:$body){
            id
            body
            createdAt
            username
            likes{
                id
                username
                createdAt
            }
            comments{
                id 
                body
                createdAt
            }
        }
    }
`
export default PostForm