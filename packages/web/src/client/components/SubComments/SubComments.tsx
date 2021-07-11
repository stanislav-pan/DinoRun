import React, { FC, useState } from "react";
import { CommonCommentType } from "@api/types/forum.types";
import { FormattedDate } from "@components/Date";
import { CloudSvg } from "@icons/CloudSvg";

interface Props {
  subComments: CommonCommentType[];
}

export const SubComments: FC<Props> = ({ subComments }: Props) => {
  const [isVisible, setIsVisible] = useState(false);

  const handlerClick = () => setIsVisible(!isVisible);
  return (
    <div className="flex justify-end">
      <div className="w-4/5">
        <div className="flex justify-end text-white">
          <div className="flex cursor-pointer" onClick={handlerClick}>
            <div className="relative">
              <CloudSvg />
              <span className="absolute top-0 right-3 font-semibold">
                {subComments.length}
              </span>
            </div>
            <span>Show comments</span>
          </div>
        </div>
        {isVisible &&
          subComments.map((item) => {
            return (
              <div
                key={item.id}
                className="flex flex-col bg-purple-100 m-2 p-3 rounded-full"
              >
                <span className="text-gray-400">{item.text}</span>
                <FormattedDate>{item.createdAt}</FormattedDate>
              </div>
            );
          })}
      </div>
    </div>
  );
};
