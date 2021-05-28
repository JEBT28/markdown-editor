import React from "react";


export const EditorInput=({setMarkdown})=>{

    const onChangeValue=(evt) =>{
        console.log(evt);

        if(evt.target.value.length>4)
        {
            setMarkdown(evt.target.value);            
        }
        else{
            setMarkdown("");
        }
    }

    return (
        <textarea  lang={"es"}  className="w-full h-full px-4 py-2 overflow-y-scroll text-gray-900 border-none resize-none scrollbar focus:ring-0" placeholder="Escribe Markdown" onChange={(evt)=>onChangeValue(evt)}>

        </textarea>
    )
}