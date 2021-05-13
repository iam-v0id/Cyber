import React,{Fragment} from 'react'
import {gql} from 'graphql-tag'
import {Query} from 'react-apollo'
import {graphql} from 'react-apollo'
import {Grid,Form} from 'semantic-ui-react'
function SingleRoom(props){
    const roomId = props.match.params.roomId
    return(
        <Grid.Row columns={3}>
        <Grid.Row>
        <h1>Start Hacking</h1>
        <Grid.Row>
        </Grid.Row>
        </Grid.Row>
          <Grid.Row>
          <Query query={FETCH_ROOM_QUERY} variables={{roomId}}>
            {
              ({loading,error,data})=>{
                if(loading) return <h1>Loading</h1>
                if(error) console.log(error)
                if(data) {
                    var getRoom = data.getRoom
                }
                console.log(getRoom)
                return <Fragment>{
                   getRoom.questions.map(room=>(
                     <Form className="container">
              <Grid.Column key={room.id}>
                <h1>{room.name}</h1>
              </Grid.Column>
              </Form>
                   )
            )
                }
                </Fragment>
            }
          }
          </Query>
          </Grid.Row>
        </Grid.Row>
      )
}

const FETCH_ROOM_QUERY= gql`
    query getRoom($roomId: ID!){
        getRoom(roomId: $roomId){
    id
    name
    createdAt
    questions{
      id
      name
      description
      answer
    }
  }
    }
`
export default SingleRoom