import React, { Fragment, useContext, useState } from "react";
import { gql } from "graphql-tag";
import { Query } from "react-apollo";
import { graphql } from "react-apollo";
import { Form, Grid, Button } from "semantic-ui-react";
import { Paper, TextField, Box } from "@material-ui/core";
import {AuthContext} from '../../context/auth'
import AddQuestion from './AddQuestion'
import DeleteQuestion from "./DeleteQuestion";
function SingleRoom(props) {
  const roomId = props.match.params.roomId;
  const [points, setpoints] = useState(0);
  const [values, setValues] = useState({
    ans: "",
  });
  const {user} = useContext(AuthContext);
  
  function checkAnswer(ans, roomId) {
    if (ans === values.ans) {
      setpoints(points + 1);
      localStorage.setItem(roomId, points);
    }
  }

  const onchange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

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
                    <Form>
                      <Form.Field>
                        <Form.Input
                          placeholder="Flag"
                          name="ans"
                          onChange={onchange}
                          value={values.ans}
                        />
                        <Button
                          type="submit"
                          color="teal"
                          onClick={() => checkAnswer(room.answer, getRoom.id)}
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
