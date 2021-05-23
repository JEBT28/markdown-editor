import React from "react";
import { ChevronLeftIcon } from "@heroicons/react/solid";
import { PostItem } from "./post-item/post-item";

export const EditorPosts = ({ postsIsOpen, setPostsIsOpen, setSelectedPost}) => {
  const postPrueba = {
    id: 1,
    title: "Prueba de post para el editor bla bla bla bla Prueba de post para el editor bla bla bla bla ",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit lorem impsum lorem ipsum dolor sit amet, consectetur adipiscing elit lorem ipsum dolor sit amet, consectetur adipiscing elit lorem ipsum dolor sit amet, consectetur adipiscing elit lorem ipsum dolor sit amet, consectetur adipiscing elit lorem ipsum dolor sit amet, consectetur adipiscing elit lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    autor: "Juan Baltierrez",
    modifiedDate: "27/05/2021",
    postDate: "20/05/2021",
  };

  const dataPosts = [postPrueba, postPrueba, postPrueba,  postPrueba, postPrueba, postPrueba,postPrueba, postPrueba, postPrueba,postPrueba, postPrueba, postPrueba];

  
  return (
    <div
      className={`text-white w-screen h-[max-content] sm:h-screen absolute sm:relative sm:w-[50rem] md:w-[40rem] flex flex-col bg-gray-900  ${
        postsIsOpen ? "block" : "hidden"
      }`}
    >
      <div className="flex items-center justify-between h-12 px-4 py-2">
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
      <div className="flex flex-col w-full overflow-y-scroll">
      {dataPosts.map((post) => {
        return (
          <>
            <hr className="border-t border-gray-700 border-solid"/>
            <PostItem
              id={post.id}
              title={post.title}
              description={post.description}
              postDate={post.postDate}
              modifiedDate={post.modifiedDate}
              autor={post.autor}
              setSelectedPost={setSelectedPost}
            />
          </>
        );
      })}
     </div>
     </div>
  );
};
