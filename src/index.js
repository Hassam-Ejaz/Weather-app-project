import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Weatherdata from "./Weatherdata"


function App(){
  return(
  
    <Weatherdata/> 
  
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( <App />);

