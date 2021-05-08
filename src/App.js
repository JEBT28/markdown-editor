import { useState } from "react";
import { Login } from "./login/login";

function App() {

  const [session,setSession] = useState({});


  return (
     <Login setSession={setSession}/>
  );
}

export default App;
