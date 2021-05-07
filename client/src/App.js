import './App.css';
import { BrowserRouter as Router, Route}  from 'react-router-dom'
import {Container} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Posts from './pages/posts'
import MenuBar from './components/MenuBar'
function App() {
  return (
    <Router>
      <Container>
      <MenuBar />
      <Route exact path ='/' component={Home}/>
      <Route exact path ='/login' component={Login}/>
      <Route exact path ='/Register' component={Register}/>
      <Route exact path = '/posts' component={Posts}/>
      </Container>
    </Router>
  );
}

export default App;
