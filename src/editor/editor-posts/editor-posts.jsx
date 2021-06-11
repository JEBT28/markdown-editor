import React, { useState, useEffect } from "react";
import { ChevronLeftIcon, PlusIcon } from "@heroicons/react/solid";
import { PostItem } from "./post-item/post-item";

export const EditorPosts = ({
  postsIsOpen,
  setPostsIsOpen,
  setSelectedPost,
  setDataPosts,
  dataPosts,
}) => {
 

  const deletePost = async (id) => {
    const dataSend = id;
    const data = await fetch("http://localhost/php-md-api/posts.php", {
      method: "DELETE",
      body: dataSend,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.text());

    console.log(data);
    const dataResponse = await JSON.parse(data);
    console.log(dataSend, dataResponse);
    if(dataResponse.msg==="OK")
    {      
      setDataPosts([...dataPosts.filter(p=>p.id!==id)]);
    }
  };

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
        <button className={"px-2 mx-1 h-full bg-white text-gray-900 focus:outline-none font-semibold justify-center border-white  items-center flex space-x-2 rounded-md border-[3px] hover:bg-gray-300"}>
        <PlusIcon className="w-auto h-full " />    
        <h3 className="hidden w-max md:inline">Nueva</h3>
    </button>
        <button
          className="w-auto h-8 sm:hidden focus:outline-none"
          onClick={() => setPostsIsOpen(!postsIsOpen)}
        >
          <ChevronLeftIcon className="w-auto h-full" />
        </button>
      </div>
      <div className="flex flex-col w-full sm:h-[93.2vh] overflow-y-scroll scrollbar">
        {dataPosts.map((post) => {
          console.log(post);
          return (
            <>
              <hr className="border-t border-gray-700 border-solid" />
              <PostItem
                id={post.id}
                title={post.title}
                postDate={post.postDate}
                modifiedDate={post.modifiedDate}
                autor={post.autor}
                setSelectedPost={setSelectedPost}
                deletePost={deletePost}
              />
            </>
          );
        })}
      </div>
    </div>
  );
};
