import React, { Fragment } from 'react'
import {gql} from 'graphql-tag'
import {Grid} from 'semantic-ui-react'
import RoomCard from '../components/RoomCard'
import {Query} from 'react-apollo'
function Rooms(){
    return(
      <Grid columns={3}>
      <Grid.Row>
      <h1>Hacking Rooms</h1>
      </Grid.Row>
        <Grid.Row>
        <Query query={FETCH_ROOMS_QUERY}>
          {
            ({loading,error,data})=>{
              if(loading) return <h1>Loading</h1>
              if(error) console.log(error)
              return <Fragment>{
                 data.getRooms.map(room=>(
            <Grid.Column key={room.id}>
              <RoomCard room = {room}/>
            </Grid.Column>
                 )
          )
              }
              </Fragment>
          }
        }
        </Query>
        </Grid.Row>
      </Grid>
    )
    
}
const FETCH_ROOMS_QUERY = gql`
   query getRooms{
  getRooms{
   	id
    name
    createdAt
  }
    }
`
export default Rooms