import Markdown from "markdown-to-jsx";
import React, { useState } from "react";
import { ChevronDoubleLeftIcon } from "@heroicons/react/solid";

export const EditorOutput = ({ markdown }) => {
  const [outputIsVisible, setOutputIsVisible] = useState(true);

  const handleClick = () => {
    setOutputIsVisible(!outputIsVisible);
  };

  return (
    <div
      className={`flex flex-col h-full lg:flex-row w-full ${
        outputIsVisible ? " w-full h-1/2 lg:h-full  " : " h-10 lg:h-full lg:w-10"
      } bg-white`}
    >
      <label
        htmlFor="output-visible"
        onClick={handleClick}
        className={`flex w-full h-10 text-gray-500 bg-gray-200 lg:w-10 lg:h-full text-bold items-center justify-end lg:items-start lg:justify-center`}
      >
        <ChevronDoubleLeftIcon
          className={`w-8 h-8 text-current m-0 ${
            outputIsVisible
              ? "transform -rotate-90 lg:rotate-180"
              : "transform rotate-90 lg:rotate-0"
          } `}
        />
      </label>
      <input type="checkbox" id="output-visible" className="hidden" />
      <div className={`w-full h-auto  overflow-y-scroll scrollbar ${
          outputIsVisible ? "block" : "hidden"
      }`}> 
      <Markdown
        className={`w-full h-full px-4 py-2 mx-auto  prose-xl md:prose prose-green`}
      >
        {markdown}
      </Markdown>
      </div>
    </div>
  );
};
