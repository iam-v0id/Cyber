const {gql} = require('apollo-server-express')
const typeDefs = gql`
  type Comment{
    id:ID!,
    body: String!,
    username: String!,
    createdAt: String!
  }
  type Userdone{
    username: String!
  }
  type Like{
    id:ID!,
    username: String!,
    createdAt: String!
  }
  type Question{
    id: ID!,
    name: String!,
    description: String!,
    answer: String!
  }
  type Room{
    id: ID!,
    name: String!,
    questions: [Question]!,
    users: [Userdone]!
  }
  type Post{
    id: ID!,
    body: String!,
    username: String!,
    createdAt: String!,
    comments: [Comment]!,
    likes: [Like]!
  }
  type User{
    id: ID!,
    email: String!,
    token: String!,
    username: String!,
    createdAt: String!,
  }
  input RegisterInput{
    username: String!,
    password: String!,
    confirmpassword: String!,
    email: String!,
  }
  input QuestionInput{
      roomId: ID!,
      name: String!,
      description: String!,
      answer: String!
  }
  type Query{
      getPosts: [Post]
      getPost(postId: ID!): Post
      getRoom(roomId: ID!): Room
      getRooms: [Room]
  }
  type Mutation{
    register(registerInput: RegisterInput): User!
    login(username:String!,password:String!): User!
    createPost(body: String!): Post!
    deletePost(postId: ID!): String!
    createComment(postId:String!, body:String!): Post!
    deleteComment(postId:ID!, commentId:ID!): Post!
    likePost(postId: ID!): Post!
    createRoom(name:String!): Room!
    deleteRoom(roomId: ID!): String!
    addQuestion(questionInput: QuestionInput): Room!
    deleteQuestion(roomId:ID!,questionId:ID!): Room!
    addusertoroom(roomId:ID!): Room!
  }
`

module.exports = typeDefs