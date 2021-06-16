import React,{useContext,useState} from 'react'
import {Button, Form} from 'semantic-ui-react'
import { useMutation} from 'react-apollo'
import gql from 'graphql-tag'
function AddQuestion(roomId){
    const [values,setValues] = useState({
        roomId: roomId.roomId,
        name: ' ',
        description: ' ',
        answer: ' '
    })
    const onchange = (event)=>{
       setValues({...values,[event.target.name]:event.target.value})
    }
    const onSubmit = (event)=>{
        addQuestion()
    }
   const [addQuestion,{error}] = useMutation(CREATE_ADD_MUTATION,{
       variables: values,
      /* update(_,result){
           console.log(result)
       } */
   })
   const crbtstyle={margin:"0vh 0vh 0vh 5vh"}
   return(
       <Form onSubmit={onSubmit}>
           <h2 className="crh2">Add question</h2>
           <Form.Field>
               Question Name
               <Form.Input
               placeholder='Question name'
               name='name'
               onChange={onchange}
               value={values.name}
               className="crinput"
               />
               Description
               <Form.Input
               placeholder='Description'
               name='description'
               onChange={onchange}
               value={values.description}
               className="crinput"
               />
               Flag
               <Form.Input
               placeholder='Answer'
               name='answer'
               onChange={onchange}
               value={values.answer}
               className="crinput"
               />
               <Button style={crbtstyle} type="submit" color="teal">Add new Question</Button>
           </Form.Field>
       </Form>
   )
}
const CREATE_ADD_MUTATION = gql`
    mutation addQuestion($roomId: ID!,$name: String!,$description: String!,$answer: String!){
        addQuestion(questionInput:{roomId: $roomId, name: $name, description: $description, answer: $answer}){
            id
        }
    }
`
export default AddQuestion