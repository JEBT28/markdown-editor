import React from "react";

export const EditorInput = ({ setMarkdown, markdown }) => {
  const onChangeValue = (evt) => {
    evt.preventDefault();
    setMarkdown(evt.target.value);
  };

  return (
    <textarea
      lang={"es"}
      className="w-full h-full px-4 py-2 overflow-y-scroll text-gray-900 border-none resize-none scrollbar focus:ring-0"
      placeholder="Escribe Markdown"
      value={markdown}
      onChange={onChangeValue}
    ></textarea>
  );
};
