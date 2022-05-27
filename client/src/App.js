import React, { useState, useEffect } from 'react';
import './App.css';
import Registration from "./components/Registration/Registration"
import LogIn from './components/LogIn/LogIn'
import Main from './components/Main/Main'

// import io from 'socket.io-client';
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";


function App() {
  
  // const [socket] = useState(() => io(':8000'));

  return (
    <div className="App">
      <BrowserRouter>
        
        <main id="body">
          <Switch>

            <Route path="/register">
              <Registration/>
            </Route>
            <Route path="/login">
              <LogIn/>
            </Route>
            <Route path="/">
              <Main/>
            </Route>
          </Switch>
        </main>

      </BrowserRouter>
    </div>
  );
}

export default App;


