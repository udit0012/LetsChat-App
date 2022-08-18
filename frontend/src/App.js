import React from 'react';
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import "./App.css"
import Alert from './components/Alert';
import Notestate from './context/Notestate';
import ChatPage from './Pages/ChatPage';
import Homepage from './Pages/Homepage';
import Login from './components/Authentication/Login';
import Register from './components/Authentication/Register';

function App() {
  return (
    <Router>
        <Notestate >
          <div className="App">
            <Routes>
              <Route  path="/" exact element={<Homepage />} />
              <Route path="/LetsChat" exact element={<ChatPage />} />
              <Route path="/login" exact element={<Login />} />
              <Route path="/register" exact element={<Register />} />
            </Routes>
            <Alert />
          </div>
        </Notestate >
      </Router >
  );
}

export default App;
