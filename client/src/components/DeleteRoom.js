import React from 'react'
import {gql} from 'graphql-tag'
import {Button,Icon} from 'semantic-ui-react'
import {useMutation} from 'react-apollo'

function DeleteRoom(roomId){
    var roomId = roomId.roomId
    const [DeleteRoom] = useMutation(DELETE_ROOM,{
        update(){

        },
        variables:{
            roomId
        }
    })
    return(
        <Button as="div" color="red" floated="right" onClick={DeleteRoom}>
            <Icon name="trash" />
        </Button>
    )
}


const DELETE_ROOM = gql`
    mutation DeleteRoom($roomId: ID!){
        deleteRoom(roomId: $roomId)
    }
`
export default DeleteRoom