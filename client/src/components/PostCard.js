import React from 'react'
import {Card,Icon,Label,Image,Button} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import moment from 'moment'
import './PostCard.css'
function PostCard({post:{body,createdAt,id,username,comments,likes}}){
    function likepost(){
        console.log("post liked")
    }
    return(
        <Card className="card" fluid>
      <Card.Content>
        <Image floated='right' size='mini' src='https://react.semantic-ui.com/images/avatar/large/molly.png'/>
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>{moment(createdAt).fromNow()}</Card.Meta>
        <Card.Description>
          {body} 
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
      <Button as='div' labelPosition='right'>
      <Button color='teal' basic onClick={likepost}>
        <Icon name='heart' />
        Like
      </Button>
      <Label as='a' basic color='red' pointing='left'>
      </Label>
    </Button>
      </Card.Content>
    </Card>
   
    )

}

export default PostCard