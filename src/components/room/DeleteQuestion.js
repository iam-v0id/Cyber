import React from 'react'
import {gql} from 'graphql-tag'
import {Button,Icon} from 'semantic-ui-react'
import {useMutation} from 'react-apollo'

function DeleteQuestion({questionId,roomId}){
    const [deleteQuestion] = useMutation(DELETE_QUESTION,{
        update(){

        },
        variables:{
            roomId,
            questionId
        }
    })
    
    return(
        <Button as="div" color="red" floated="right" onClick={deleteQuestion}>
            <Icon name="trash" />
        </Button>
    )
}


const DELETE_QUESTION = gql`
    mutation deleteQuestion($roomId:ID!,$questionId: ID!){
        deleteQuestion(roomId:$roomId,questionId: $questionId){
            id
        }
    }
`
export default DeleteQuestion