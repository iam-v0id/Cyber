import React from 'react'
import {Card,Icon,Label,Image,Button} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import moment from 'moment'
import './RoomCard.css'
function RoomCard({room:{id,name,createdAt}}){
    return(
        <Card className="roomcard" fluid>
    <Image src='https://news.microsoft.com/wp-content/uploads/prod/sites/358/2019/08/GettyImages-914818226.jpg' wrapped ui={false} />
    <Card.Content>
      <Card.Header>{name}</Card.Header>
      <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
          <Button as={Link} to={`/rooms/${id}`}> 5t4rt H4ck1ng</Button>
    </Card.Content>
    
  </Card>
   
    )

}

export default RoomCard