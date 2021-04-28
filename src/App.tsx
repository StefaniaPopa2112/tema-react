import React from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import {BrowserRouter} from 'react-router-dom';
import Main from './components/Main';
import Nav from './components/Nav';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Main />
      </BrowserRouter>
    </div>
  );
}

export default App;
