import React, { useContext,Fragment } from 'react'
import {gql} from 'graphql-tag'
import {Grid,Transition} from 'semantic-ui-react'
import PostCard from '../components/PostCard'
import {Query} from 'react-apollo'
import AuthContext from '../context/auth'
import PostForm from '../components/PostForm'
function Posts(){
    return(
      <Grid.Row columns={3}>
      <Grid.Row>
      <h1>Recent Posts</h1>
      <Grid.Row>
        <PostForm/>
      </Grid.Row>
      </Grid.Row>
        <Grid.Row>
        <Query query={FETCH_POSTS_QUERY}>
          {
            ({loading,error,data})=>{
              if(loading) return <h1>Loading</h1>
              if(error) console.log(error)
              
              return <Fragment>{
                 data.getPosts.map(post=>(
                   <Transition>
            <Grid.Column key={post.id}>
              <PostCard post = {post}/>
            </Grid.Column>
            </Transition>
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
const FETCH_POSTS_QUERY = gql`
   query getPosts{
  getPosts{
   	id
    body
    username
    createdAt
    comments{
      id
      body
      username
      createdAt
    }
  likes{
    id
    username
    createdAt
  }
  }
    }
`
export default Posts