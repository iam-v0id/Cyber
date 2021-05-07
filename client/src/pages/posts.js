import React from 'react'
import {useQuery} from '@apollo/react-hooks'
import {gql} from 'graphql-tag'
import {Grid} from 'semantic-ui-react'
import PostCard from '../components/PostCard'
function Posts(){
    const {loading,error,data:{getPosts:posts}} = useQuery(FETCH_POSTS_QUERY)
    if(error){
      console.log(error)
    }
    return(
      <Grid columns={3}>
      <Grid.Row>
      <h1>Recent Posts</h1>
      </Grid.Row>
        <Grid.Row>
        { loading ?(
          <h1>loading Posts...</h1>
        ):(
          posts && posts.map(post =>(
            <Grid.Column key={post.id}>
              <PostCard post = {post}/>
            </Grid.Column>
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