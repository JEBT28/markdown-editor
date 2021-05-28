import Markdown from "markdown-to-jsx";
import React, { useState } from "react";
import { ChevronDoubleLeftIcon } from "@heroicons/react/solid";

export const EditorOutput = ({ markdown }) => {
  const [outputIsVisible, setOutputIsVisible] = useState(true);

  const handleClick = () => {
    setOutputIsVisible(!outputIsVisible);
    console.log(outputIsVisible);
  };

  return (
    <div
      className={`flex flex-col h-full md:flex-row w-full ${
        outputIsVisible ? " w-full" : " h-10 md:h-full md:w-10"
      } max-h-full bg-white`}
    >
      <label
        htmlFor="output-visible"
        onClick={handleClick}
        className={`flex w-full h-10 text-gray-500 bg-gray-200 md:w-10 md:h-full lg:h-full text-bold items-center justify-end md:items-start md:justify-center`}
      >
        <ChevronDoubleLeftIcon
          className={`w-8 h-8 text-current m-0 ${
            outputIsVisible
              ? "transform -rotate-90 md:rotate-180"
              : "transform rotate-90 md:rotate-0"
          } `}
        />
      </label>
      <input type="checkbox" id="output-visible" className="hidden" />
      <Markdown
        className={`w-full h-full ${
          outputIsVisible ? "block" : "hidden"
        } px-4 py-2 mx-auto overflow-y-scroll prose prose-green scrollbar`}
      >
        {markdown}
      </Markdown>
    </div>
  );
};
