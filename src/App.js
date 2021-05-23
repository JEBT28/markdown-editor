import { useState, useEffect } from "react";
import { Login } from "./login/login";
import {EditorMain} from "./editor/editor-main";

function App() {
  const [session,setSession] = useState(undefined);

  
   
  useEffect(()=>{
    var cookies = document.cookie.toString();
    cookies = cookies.replace("sessid=","");
  
    if(cookies!== undefined)
    {
        setSession(cookies);
    }
  },[]);



  return session ===undefined ?(
     <Login setSession={setSession}/>
  ):(<EditorMain session={session}/>);
}

export default App;
