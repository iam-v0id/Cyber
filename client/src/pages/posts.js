import React, { Fragment } from 'react'
import {gql} from 'graphql-tag'
import {Grid} from 'semantic-ui-react'
import PostCard from '../components/PostCard'
import {Query} from 'react-apollo'
function Posts(){
    
    return(
      <Grid columns={3}>
      <Grid.Row>
      <h1>Recent Posts</h1>
      </Grid.Row>
        <Grid.Row>
        <Query query={FETCH_POSTS_QUERY}>
          {
            ({loading,error,data})=>{
              if(loading) return <h1>Loading</h1>
              if(error) console.log(error)
              
              return <Fragment>{
                 data.getPosts.map(post=>(
            <Grid.Column key={post.id}>
              <PostCard post = {post}/>
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