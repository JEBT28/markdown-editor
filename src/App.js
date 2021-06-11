import { useState, useEffect } from "react";
import { Login } from "./login/login";
import {EditorMain} from "./editor/editor-main";

function App() {
  const [mySession,setSession] = useState(undefined);
 
  useEffect(()=>{
   var sessid = window.localStorage.getItem('sessid');
    if(sessid!== undefined && sessid!==null)
    {      
      setSession(sessid);
    }
  },[]);



  return mySession ===undefined ?(
     <Login setSession={setSession}/>
  ):(<EditorMain mySession={mySession} setSession={setSession}/>);
}

export default App;
