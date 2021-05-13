import React, { useContext } from 'react'
import {Card,Icon,Label,Image,Button} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import moment from 'moment'
import './RoomCard.css'
import DeleteRoom from './DeleteRoom'
import {AuthContext} from '../context/auth'
function RoomCard({room:{id,name,createdAt}}){
  const {user} = useContext(AuthContext)
    return(
        <Card className="roomcard" fluid>
    <Image src='https://news.microsoft.com/wp-content/uploads/prod/sites/358/2019/08/GettyImages-914818226.jpg' wrapped ui={false} />
    <Card.Content>
      <Card.Header>{name}</Card.Header>
      <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
          <Button as={Link} to={`/rooms/${id}`}> 5t4rt H4ck1ng</Button>
          {user && user.username==='Alpha_2018' && <DeleteRoom roomId={id} />}
    </Card.Content>
    
  </Card>
    )

}

export default RoomCard