import React from 'react'
import {gql} from 'graphql-tag'
import {Button,Icon} from 'semantic-ui-react'
import {useMutation} from 'react-apollo'

function DeleteButton(postId){
    var postId = postId.postId
    const [deletepost] = useMutation(DELETE_POST,{
        update(){

        },
        variables:{
            postId
        }
    })
    console.log(postId)
    return(
        <Button as="div" color="red" floated="right" onClick={deletepost}>
            <Icon name="trash" />
        </Button>
    )
}


const DELETE_POST = gql`
    mutation deletePost($postId: ID!){
        deletePost(postId: $postId)
    }
`
export default DeleteButton