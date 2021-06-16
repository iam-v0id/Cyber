import React from 'react'
import {AuthContext} from '../../context/auth'
import {useContext} from 'react'
import gql from 'graphql-tag'
import {useMutation} from 'react-apollo'
import {useState} from 'react'
import {Button} from 'semantic-ui-react'
function RoomSolved(props){
    var room=props.room;
   // console.log(room)
    var roomId=room.id
    var f=0;
    const user = useContext(AuthContext);
    const [values,setValues] = useState({
      roomId: roomId
      })
      const onSubmit = (event)=>{
        room.users.map((name)=>{
         // console.log(name.username)
          if(name.username==user.user.username){
            f=1
              localStorage.setItem('user'+roomId,1);
          }
        })
        if(f!=1){
          addusertoroom()
          localStorage.setItem('user'+roomId,1);
        }
    }
    
   const [addusertoroom,{error}] = useMutation(ADD_USER_MUTATION,{
      variables: values,
      update(_,result){
          console.log("added room",result)
      } ,
      if(error){
        console.log('error')
      }
  }) 
 //addusertoroom()

    return(<div class="ui success message">
    <i class="close icon" onClick={onclick} hidden></i>
     <div class="header">
            Your Successfully completed the room
    </div>
      <p>Submit and continue hacking the next room</p>
      <Button type="submit" onClick={onSubmit}>{((localStorage.getItem('user'+roomId)==1) && 'submitted') ||((localStorage.getItem('user'+roomId)!=1) && 'submit')}</Button>
        </div>)
}
const ADD_USER_MUTATION = gql`
    mutation addusertoroom($roomId: ID!){
            addusertoroom(roomId: $roomId){
             id
        }
    }
`

export default RoomSolved