import React from "react";
import { DeleteButton } from "./delete-button";

import {
  UserIcon,
  PencilIcon,
  GlobeAltIcon
} from "@heroicons/react/solid";

export const PostItem = ({
  id,
  title,
  postDate,
  modifiedDate,
  autor,
  disabled,
  setSelectedPost,
  deletePost
}) => {

  if (disabled) {
    return <></>;
  } else {
    return (
      <div
        key={id}
        className="relative w-full h-auto"
        onClick={(evt) => setSelectedPost(evt, id)}
        id={id}
      >
        <div className=" z-0relative flex flex-col w-full p-4 space-y-2 text-white cursor-pointer h-[max-content] hover:bg-gray-700">
          <h3 className="w-full h-auto text-lg font-semibold line-clamp-2">
            {title}
          </h3>

          <div className="flex justify-between h-auto">
            <h3 className="flex items-center w-full w-[max-content] text-sm font-semibold">
              <i className="w-auto h-4 mr-1">
                <GlobeAltIcon className="w-auto h-full" />
              </i>
              {postDate}
            </h3>
            <p className="flex items-center text-sm ">
              <i className="w-auto h-4 mr-1">
                <PencilIcon className="w-auto h-full" />
              </i>
              {modifiedDate}
            </p>
          </div>
          <div className="flex justify-between h-auto">
            <h6 className="flex items-center w-[max-content] font-semibold">
              <i className="w-auto h-4 mr-1">
                <UserIcon className="w-auto h-full" />
              </i>
              {autor}
            </h6>
           <DeleteButton deletePost={deletePost} id={id}/>
          </div>
        </div>
      </div>
    );
  }
};
