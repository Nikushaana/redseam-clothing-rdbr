import React from "react";

interface buttonType {
  text: string;
  click: () => void;
}

export default function Button({ text, click }: buttonType) {
  return (
    <h1
      onClick={click}
      className="w-full h-[41px] flex items-center justify-center cursor-pointer bg-myRed text-white rounded-[10px] text-[14px] font-normal"
    >
      {text}
    </h1>
  );
}
