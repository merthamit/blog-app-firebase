import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import Navbar from './components/Navbar';
import { Container } from '@chakra-ui/react';
import Post from './pages/post/Post';
import Signup from './pages/signup/Signup';
import Create from './pages/create/Create';
import useAuthContext from './hooks/useAuthContext';
import { Redirect } from 'react-router-dom';

function App() {
  const { authIsReady, user } = useAuthContext();
  return (
    <BrowserRouter>
      {authIsReady && (
        <Container maxW="container.xl">
          <Navbar />
          <Switch>
            <Route exact path="/">
              {user && <Home />}
              {!user && <Redirect to="/login" />}
            </Route>
            <Route exact path="/login">
              {!user && <Login />}
              {user && <Redirect to="/" />}
            </Route>
            <Route exact path="/signup">
              {!user && <Signup />}
              {user && <Redirect to="/" />}
            </Route>
            <Route exact path="/post/:id">
              {user && <Post />}
              {!user && <Redirect to="/login" />}
            </Route>
            <Route exact path="/create/">
              {user && <Create />}
              {!user && <Redirect to="/login" />}
            </Route>
          </Switch>
        </Container>
      )}
    </BrowserRouter>
  );
}

export default App;
