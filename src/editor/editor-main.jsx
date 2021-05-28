import React , {useState} from 'react';
import {EditorHeader} from './editor-header/editor-header';
import { EditorInput } from './editor-input/editor-input';
import { EditorOutput } from './editor-output/editor-output';
import { EditorPosts } from './editor-posts/editor-posts';

export const EditorMain =({session})=>{
    const [postsIsOpen,setPostsIsOpen] = useState(false);

    const [selectedPost, setSelectedPost] = useState(undefined);

    const [markdown, setMarkdown] = useState("");

    return (
        <div className="flex w-screen h-screen overflow-hidden">
            <EditorPosts setPostsIsOpen={setPostsIsOpen} postsIsOpen={postsIsOpen} setSelectedPost={setSelectedPost}/>
            <main className="flex flex-col w-full h-full">
            <EditorHeader setPostsIsOpen={setPostsIsOpen} postsIsOpen={postsIsOpen}/>    
            <div className="h-[95.7vh] w-full flex mb-0 flex-col md:flex-row gap-2 bg-gray-900">
                <EditorInput setMarkdown={setMarkdown}/>
                <EditorOutput markdown={markdown}/>
            </div>
            </main>
        </div> 
);
};