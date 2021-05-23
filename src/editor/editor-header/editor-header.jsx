import React from "react";
import { MenuIcon } from "@heroicons/react/solid";

export const EditorHeader = ({postsIsOpen,setPostsIsOpen}) => {

    
    
  return (
    <header className="flex w-full h-12 px-4 py-2 text-white bg-gray-900 ">
      <button
        className="w-auto h-8 focus:outline-none"
        onClick={()=>setPostsIsOpen(!postsIsOpen)}
      >
        <MenuIcon className="w-auto h-full" />
      </button>
    </header>
  );
};
