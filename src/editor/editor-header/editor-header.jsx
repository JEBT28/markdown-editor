import React from "react";
import { MenuIcon, SaveIcon, LogoutIcon } from "@heroicons/react/solid";

export const EditorHeader = ({
  postsIsOpen,
  setPostsIsOpen,
  setSession,
  savePost,
  setTitle,
  title
}) => {

  const onChangeValue = (evt) => {
    evt.preventDefault();

   
        setTitle(evt.target.value);
 
  };

  const destroySession=()=>{
    window.localStorage.clear();
    setSession(undefined);    
  } 


  return (
    <header className="flex w-full h-12 px-4 py-2 text-white bg-gray-900 ">
      <button
        className="w-auto h-8 focus:outline-none"
        onClick={() => setPostsIsOpen(!postsIsOpen)}
      >
        <MenuIcon className="w-auto h-full" />
      </button>
      <input
        type="text"
        className="w-4/6 h-full font-bold text-white bg-transparent border-none rounded lg:w-96 focus:text-gray-900 focus:bg-white ring-0"
        value={title}
        onChange={onChangeValue}
      />
      <button onClick={()=>savePost()} className=" px-2 mx-1 h-full focus:outline-none font-semibold text-white justify-center border-gray-300  items-center flex space-x-2 rounded-md border-[3px] hover:bg-gray-700">
      
        <SaveIcon className="w-auto h-full " />
        <h3 className="hidden ml-2 w-max md:inline">Guardar</h3>
      </button>

      <button className="w-auto px-2 h-full focus:outline-none mx-1 font-semibold bg-gray-300 ml-auto float-right text-gray-900 border-gray-300 justify-center items-center space-x-2 flex rounded-md border-[3px] "
        onClick={destroySession}>
        <LogoutIcon className="w-auto h-full" />
        <h3 className="hidden ml-2 md:block w-max">Cerrar Sesión</h3>
      </button>
    </header>
  );
};
