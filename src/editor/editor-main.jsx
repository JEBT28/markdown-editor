import React , {useState} from 'react';
import {EditorHeader} from './editor-header/editor-header';
import { EditorPosts } from './editor-posts/editor-posts';

export const EditorMain =({session})=>{
    const [postsIsOpen,setPostsIsOpen] = useState(false);

    const [selectedPost, setSelectedPost] = useState(undefined);

    return (
        <div className="flex w-screen h-screen overflow-hidden">
            <EditorPosts setPostsIsOpen={setPostsIsOpen} postsIsOpen={postsIsOpen} setSelectedPost={setSelectedPost}/>
            <EditorHeader setPostsIsOpen={setPostsIsOpen} postsIsOpen={postsIsOpen}/>           
        </div> 
);
};