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
    const dbt={display:"flex",justifyContent:"center"}
    return(
        <Button style={dbt} as="div" color="red" onClick={DeleteRoom}>
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