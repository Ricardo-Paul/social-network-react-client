import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import signup from './pages/signup';
import login from './pages/login';
import home from './pages/home';
import Navbar from './components/Navbar'; 


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

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
      <Router>
        <Navbar/>
        <div className="container">
        <Switch>
          <Route exact path="/" component={home} />
          <Route exact path="/login" component={login} />
          <Route exact path="/signup" component={signup} />
        </Switch>
        </div>
      </Router>
    </div>
    </MuiThemeProvider>
  );
}

export default App;
