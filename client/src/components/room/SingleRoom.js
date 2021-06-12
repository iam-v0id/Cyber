import React, { Fragment, useContext, useState } from "react";
import { gql } from "graphql-tag";
import { Query } from "react-apollo";
import { graphql } from "react-apollo";
import { Form, Grid, Button } from "semantic-ui-react";
import { Paper, TextField, Box } from "@material-ui/core";
import {AuthContext} from '../../context/auth'
import AddQuestion from './AddQuestion'
import DeleteQuestion from "./DeleteQuestion";
import { Room } from "@material-ui/icons";
function SingleRoom(props) {
  const roomId = props.match.params.roomId;
  const [values, setValues] = useState(new Map());
  const onchange = (e) => {
    const name = e.target.name;
    const hidden = e.target.value;
    setValues(values.set(name, hidden));
  };
  if(localStorage.getItem(roomId)>0){

  }
  else{
  localStorage.setItem(roomId, 0);
  }
  const onsubmit = (e) => {
    e.preventDefault();
    const name = e.target.id;
    
    if (values.get(name) === e.target.name) {
    if(localStorage.getItem(name)!=1){
      localStorage.setItem(name, 1);
      var a ={}
      a.number=1
      var points = parseInt(localStorage.getItem(roomId))
      a.number = points+1
      localStorage.setItem(roomId, a.number);
      if(localStorage.getItem(roomId)==10){
        //Todo room completed
        //send mutation to server add name of user to db
      }
    }
    else{
      //todo disable button
      console.log("already submitted")
    }
    } else {
      //todo pop up asnwer was wrong
      console.log("answer was incorrect ");
    }
  };
  const {user} = useContext(AuthContext)

  return (
    <Grid.Row columns={3}>
      <Grid.Row>
        <h1>Start Hacking</h1>
      </Grid.Row>
      <Grid.Row>
        <Query query={FETCH_ROOM_QUERY} variables={{ roomId }}>
          {({ loading, error, data }) => {
            if (loading) return <h1>Loading</h1>;
            if (error) console.log(error);
            if (data) {
              var getRoom = data.getRoom;
            }
            return (
              <Fragment>
                  {user.username=='Alpha_2018' && <AddQuestion roomId={getRoom.id} />}
                {getRoom.questions.map((room) => (
                  <Grid.Column key={room.id}>
                    <span>Question</span>
                    <h2>{room.name}</h2>
                    <h3>{room.description}</h3>
                    <Form  name={room.answer} id={room.id} name={room.answer} onSubmit={onsubmit}>
                      <Form.Field>
                        <Form.Input
                          placeholder="Flag"
                          name={room.id}
                          onChange={onchange}
                        />
                        <Button
                          type="submit"
                          color="teal"
                        >
                          submit
                        </Button>
                      {user && user.username==='Alpha_2018' && <DeleteQuestion questionId={room.id} roomId={getRoom.id} />}
                      </Form.Field>
                    </Form>
                  </Grid.Column>
                ))}
              </Fragment>
            );
          }}
        </Query>
      </Grid.Row>
    </Grid.Row>
  );
}

const FETCH_ROOM_QUERY = gql`
  query getRoom($roomId: ID!) {
    getRoom(roomId: $roomId) {
      id
      name
      createdAt
      questions {
        id
        name
        description
        answer
      }
    }
  }
`;
export default SingleRoom;