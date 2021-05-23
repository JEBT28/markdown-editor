import React , {useState} from 'react';
import {EditorHeader} from './editor-header/editor-header';
import { EditorPosts } from './editor-posts/editor-posts';

export const EditorMain =({session})=>{
    const [postsIsOpen,setPostsIsOpen] = useState(false);

    return (
        <div className="flex w-screen h-screen">
            <EditorPosts setPostsIsOpen={setPostsIsOpen} postsIsOpen={postsIsOpen}/>
            <EditorHeader setPostsIsOpen={setPostsIsOpen} postsIsOpen={postsIsOpen}/>
           
        </div> 
);
};