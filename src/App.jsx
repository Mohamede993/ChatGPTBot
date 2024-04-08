import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Top from './Components/Top';
import ChatBot from './Components/ChatBot';
// import Massagecon from './Components/Massagecon';




function App() {
  return (
    <div className='body'>
    <Top></Top>
    {/* <Massagecon></Massagecon> */}
    
    <ChatBot></ChatBot>
       </div>
  );
}

export default App;
