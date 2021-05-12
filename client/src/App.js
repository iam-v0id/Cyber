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
const client = new ApolloClient({
  uri:'http://localhost:5000/graphql'
})
function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
      <MenuBar />
      <Route exact path ='/' component={Home}/>
      <Route exact path ='/login' component={Login}/>
      <Route exact path ='/Register' component={Register}/>
      <Container>
      <Route exact path = '/posts' component={Posts}/>
      </Container>
      <Route exact path='/Rooms' component={Rooms}/>
    </Router>
    </ApolloProvider>
    
  );
}

export default App;
