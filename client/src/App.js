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
import ApolloClient from 'apollo-boost'
import {AuthProvider} from './context/auth'
import AuthRoute from './context/AuthRoute'
import PostsRoute from './context/PostsRoute'
import RoomsRoute from './context/RoomsRoute'
const client = new ApolloClient({
  uri:'http://localhost:5000/graphql'
})
function App() {
  return (
    <AuthProvider>
      <ApolloProvider client={client}>
      <Router>
      <Container>
      <MenuBar />
      <Route exact path ='/' component={Home}/>
      <AuthRoute exact path ='/login' component={Login}/>
      <AuthRoute exact path ='/Register' component={Register}/>
      <PostsRoute exact path = '/posts' component={Posts}/>
      <RoomsRoute exact path='/Rooms' component={Rooms}/>
      </Container>
    </Router>
    </ApolloProvider>
    </AuthProvider>
    
  );
}

export default App;
