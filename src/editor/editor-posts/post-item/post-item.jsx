import React from "react";

import { UserIcon,  PencilIcon } from "@heroicons/react/solid";

export const PostItem = ({
  id,
  title,
  description,
  postDate,
  modifiedDate,
  autor,
  setSelectedPost,
}) => {
  return (
    <div
      className="flex flex-col w-full h-auto p-4 space-y-2 text-white cursor-pointer hover:bg-gray-700"
      onClick={setSelectedPost(id)}
      id={id}
    >
      <h3 className="w-full h-auto text-lg font-semibold line-clamp-2">
        {title}
      </h3>
      <p className="w-full text-sm font-semibold">{postDate}</p>
      <p className="w-full font-medium line-clamp-3">{description}</p>
      <div className="flex justify-between h-auto">
        <p className="flex items-center text-sm ">
          <i className="w-auto mr-1 h-4/5">
            <PencilIcon className="w-auto h-full" />
          </i>
          {modifiedDate}
        </p>
        <h6 className="flex items-center font-semibold">
          <i className="w-auto mr-1 h-4/5">
            <UserIcon className="w-auto h-full" />
          </i>
          {autor}
        </h6>
      </div>
    </div>
  );
};
