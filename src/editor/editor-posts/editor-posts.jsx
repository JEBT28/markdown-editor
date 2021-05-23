import React from "react";
import { ChevronLeftIcon } from "@heroicons/react/solid";

export const EditorPosts = ({ postsIsOpen, setPostsIsOpen }) => {
  return (
    <div
      className={`text-white w-screen h-screen absolute sm:relative sm:w-[50rem] md:w-[40rem] flex flex-col bg-gray-900  ${
        postsIsOpen ? "block" : "hidden"
      }`}
    >
      <div className="flex items-center justify-between px-4 py-2">
        <h1 className="inline-block text-xl font-bold font-poppins">
          Ultimas Entradas
        </h1>
        <button
          className="w-auto h-8 sm:hidden focus:outline-none"
          onClick={() => setPostsIsOpen(!postsIsOpen)}
        >
          <ChevronLeftIcon className="w-auto h-full" />
        </button>
      </div>
    </div>
  );
};
