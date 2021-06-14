import React from 'react'

function RoomSolved(){
    return(<div class="ui success message">
    <i class="close icon" onClick={onclick} hidden></i>
     <div class="header">
            Your Successfully completed the room
    </div>
      <p>You may now start hacking the next room</p>
        </div>)
}

export default RoomSolved