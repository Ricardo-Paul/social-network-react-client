import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import signup from './pages/signup';
import login from './pages/login';
import home from './pages/home';
import Navbar from './components/Navbar'; 
import jwtDecode from 'jwt-decode';
import AuthRoute from './util/AuthRoute';

// Redux
import { Provider } from 'react-redux';
import store from './redux/store';

// Mui Stuff
import { ThemeProvider as MuiThemeProvider} from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

const theme = createMuiTheme({
  palette: {
    primary: {
        light: '#ffb300',
        main:  '#01579b',
        dark:  '#ff6f00',
        contrastText: '#fff'
    },
    secondary: {
        light: '#212121',
        main: '#558b2f',
        dark: '#558b2f',
        contrastText: '#fff'
    }
}
});

let authenticated;
const token = localStorage.FBIdToken;
if(token){
  const decodedToken = jwtDecode(token);
  if(decodedToken.exp * 1000 < Date.now()){
    window.location.href = '/login';
    authenticated = false;
  }else {
    authenticated = true;
  }
}

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
      <Router>
        <Navbar/>
        <div className="container">
        <Switch>
          <Route exact path="/" component={home} />
          <AuthRoute exact path="/login" component={login} authenticated={authenticated} />
          <AuthRoute exact path="/signup" component={signup} authenticated={authenticated} />
        </Switch>
        </div>
      </Router>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
