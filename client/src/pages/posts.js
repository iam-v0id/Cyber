import React from 'react'
import {useQuery} from '@apollo/react-hooks'
import {gql} from 'graphql-tag'
import {Grid} from 'semantic-ui-react'
import PostCard from '../components/PostCard'
function Posts(){
    const responce = useQuery(FETCH_POSTS_QUERY)
    return(
      <Grid columns={3}>
      <Grid.Row>
      <h1>Recent Posts</h1>
      </Grid.Row>
        <Grid.Row>
        { (
          responce && responce.data && responce.data.getPosts && responce.data.getPosts.posts && responce.data.getPosts.posts.map(post =>(
            console.log(post)
            /*<Grid.Column key={post.id}>
              <PostCard post = {post}/>
            </Grid.Column>
            */
          ))
        )}
        </Grid.Row>
      </Grid>
    )
}
const FETCH_POSTS_QUERY = gql`
        {
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