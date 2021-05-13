import './App.css';
import { BrowserRouter as Router, Route}  from 'react-router-dom'
import {Container} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Posts from './pages/posts'
import Rooms from './pages/Rooms'
import MenuBar from './components/MenuBar'
import {ApolloProvider} from 'react-apollo'
import ApolloClient from 'apollo-client'
import {AuthProvider} from './context/auth'
import AuthRoute from './context/AuthRoute'
import PostsRoute from './context/PostsRoute'
import RoomsRoute from './context/RoomsRoute'
import {setContext} from 'apollo-link-context'
import {createHttpLink} from 'apollo-link-http'
import {InMemoryCache} from 'apollo-cache-inmemory'
import SingleRoom from './components/room/SingleRoom'
const httpLink = createHttpLink({
  uri:'http://localhost:5000/graphql'
})
const authLink = setContext(()=>{
  const token=localStorage.getItem('JwtToken')
  return{
    headers:{
      Authorization: token? `Bearer ${token}` : ''
    }
  }
})
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})
function App() {
  return (
    <AuthProvider>
      <ApolloProvider client={client}>
      <Router>
      <MenuBar />
      <Route exact path ='/' component={Home}/>
      <AuthRoute exact path ='/login' component={Login}/>
      <AuthRoute exact path ='/Register' component={Register}/>
      <Container>
      <PostsRoute exact path = '/posts' component={Posts}/>
      </Container>
      <RoomsRoute exact path='/Rooms' component={Rooms}/>
      <RoomsRoute exact path='/Rooms/:roomId' component={SingleRoom}/>
    </Router>
    </ApolloProvider>
    </AuthProvider>
    
  );
}

export default App;
