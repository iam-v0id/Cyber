import React,{useContext,useState} from 'react'
import {Button, Form} from 'semantic-ui-react'
import { useMutation} from 'react-apollo'
import gql from 'graphql-tag'

function RoomForm(){
    const [values,setValues] = useState({
        name: ''
    })
    const onchange = (event)=>{
       setValues({...values,[event.target.name]:event.target.value})
    }
    const onSubmit = (event)=>{
        createRoom()
    }
   const [createRoom,{error}] = useMutation(CREATE_ROOM_MUTATION,{
       variables: values,
       update(_,result){
           console.log(result)
       } 
   })
   return(
       <Form onSubmit={onSubmit}>
           <h2>Create Room</h2>
           <Form.Field>
               <Form.Input
               placeholder='Create Room'
               name='name'
               onChange={onchange}
               value={values.name}
               />
               <Button type="submit" color="teal">Create Room</Button>
           </Form.Field>
       </Form>
   )
}
const CREATE_ROOM_MUTATION = gql`
    mutation createRoom($name: String!){
        createRoom(name:$name){
            id
        }
    }
`
export default RoomForm