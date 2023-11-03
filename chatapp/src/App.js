// client/src/App.js

import "./App.css";
// import { useState } from "react";
// import Home from "./Pages/Home/index";
// import Chat from "./Pages/chat/index";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import io from "socket.io-client";
import { Button, 
  // ButtonGroup
 } from '@chakra-ui/react'
import HomePage from "./Pages/HomePage";
import ChatPage from "./Pages/ChatPage";

// const socket = io.connect("http://localhost:4000");

function App() {
  // const [username, setUserName] = useState("");
  // const [room, setRoom] = useState("");

  return (
    <div className="App">
      <Route path="/" component={HomePage} exact/>
      {/* <Route path="/chats" component={ChatPage} /> */}
    </div>
    // <Router>
    //   <div className="App">
    //     <Routes>
    //       <Route
    //         path="/"
    //         element={
    //           <Home
    //             username={username}
    //             setUserName={setUserName}
    //             room={room}
    //             setRoom={setRoom}
    //             socket={socket}
    //           />
    //         }
    //       />
    //       {/* Add this */}
    //       <Route
    //         path="/chat"
    //         element={<Chat 
    //         username={username} 
    //         room={room} 
    //         socket={socket} />}
    //       />
    //     </Routes>
    //   </div>
    // </Router>

  );
}

export default App;
