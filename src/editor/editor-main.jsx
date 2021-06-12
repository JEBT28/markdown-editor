import React, { useState, useLayoutEffect } from "react";
import { EditorHeader } from "./editor-header/editor-header";
import { EditorInput } from "./editor-input/editor-input";
import { EditorOutput } from "./editor-output/editor-output";
import { EditorPosts } from "./editor-posts/editor-posts";

export const EditorMain = ({ mySession, setSession }) => {
  useLayoutEffect(() => {
    loadPosts();

  });

  const [postsIsOpen, setPostsIsOpen] = useState(false);

  const [selectedPost, setSelectedPost] = useState(undefined);

  const [markdown, setMarkdown] = useState("");

  const [title, setTitle] = useState("");

  const [dataPosts, setDataPosts] = useState([]);

  const savePost = async () => {
    if (selectedPost === undefined) {

      const post = { title: title, content: markdown, user: 1 };
      const dataSend = { post: post, sessid: mySession.sessid };
      const data = await fetch("http://localhost/php-md-api/posts.php", {
        method: "POST",
        body: JSON.stringify(dataSend),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.text());
      const dataResponse = await JSON.parse(data);


      if (dataResponse.msg === "OK") {
        const post = dataResponse.body;

        setDataPosts([...dataPosts, post]);
        setSelectedPost(post);
      }
    } else {
      selectedPost.content = markdown;
      selectedPost.title = title;
      const dataSend = { post: selectedPost, sessid: mySession.sessid };
      const data = await fetch("http://localhost/php-md-api/posts.php", {
        method: "PUT",
        body: JSON.stringify(dataSend),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.text());

      const dataResponse = await JSON.parse(data);

      if (dataResponse.msg === "OK") {

      }
    }
  };
  const loadPosts = async () => {

    const data = await fetch("http://localhost/php-md-api/posts.php?sessid=" + encodeURI(mySession.sessid), {
      method: "GET",
    }).then((res) => res.text());
    const resp = await JSON.parse(data).body;

    const posts = Array.from(resp);

    setDataPosts(posts);
  }

  const deletePost = async (id) => {
    const dataSend = { sessid: mySession.sessid, id: id };
    const data = await fetch("http://localhost/php-md-api/posts.php", {
      method: "DELETE",
      body: JSON.stringify(dataSend),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.text());


    const dataResponse = await JSON.parse(data);

    if (dataResponse.msg === "OK") {
      setDataPosts([...dataPosts.filter(p => p.id !== id)]);
    }
  };

  const changeSelectedPost = async (evt, id) => {
    evt.preventDefault();
    const posts = await dataPosts;
    let post = Array.from(posts).filter((p) => p.id === id);
    setSelectedPost(post[0]);
    setTitle(selectedPost === undefined ? "" : selectedPost.title)
    setMarkdown(selectedPost === undefined ? "" : selectedPost.content);
  };

  return (
    <div className="flex w-screen h-screen overflow-hidden">
      <EditorPosts
        setPostsIsOpen={setPostsIsOpen}
        postsIsOpen={postsIsOpen}
        setSelectedPost={changeSelectedPost}
        setDataPosts={setDataPosts}
        dataPosts={dataPosts}
        deletePost={deletePost}
      />
      <main className="flex flex-col w-full h-full">
        <EditorHeader
          setPostsIsOpen={setPostsIsOpen}
          postsIsOpen={postsIsOpen}
          setSession={setSession}
          savePost={savePost}
          title={title}
          setTitle={setTitle}
          mySession={mySession}
        />
        <div className="h-[95.7vh] w-full  flex mb-0 flex-col lg:flex-row gap-2 bg-gray-900">
          <EditorInput
            setMarkdown={setMarkdown}
            markdown={markdown === undefined ? "" : markdown}
          />
          <EditorOutput markdown={markdown === undefined ? "" : markdown} />
        </div>
      </main>
    </div>
  );
};
