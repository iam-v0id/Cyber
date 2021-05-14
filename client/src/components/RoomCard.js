import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import moment from 'moment'
import './RoomCard.css'
import DeleteRoom from './DeleteRoom'
import {AuthContext} from '../context/auth'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import {Button} from 'semantic-ui-react'
import Typography from '@material-ui/core/Typography';
function RoomCard({room:{id,name,createdAt}}){
  const {user} = useContext(AuthContext)
  const rbt={display:"flex",justifyContent:"center"}
    return(
      <Card className="roomcard">
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image="https://blogs.unity3d.com/wp-content/uploads/2019/05/image1-11.png"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          {moment(createdAt).fromNow()}
          </Typography>
        </CardContent>
        <Button as={Link} to={`/rooms/${id}`} size="small" variant="contained" color="primary" style={rbt}>5t4rt H4ck1ng</Button>
        {user && user.username==='Alpha_2018' && <DeleteRoom roomId={id} />}
    </Card>
    )

}

export default RoomCard