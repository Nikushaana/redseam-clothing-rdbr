import React from "react";
import { BsXLg } from "react-icons/bs";
import { IoCheckmarkOutline } from "react-icons/io5";
import Button from "./button";

export default function Success() {
  return (
    <div
      className={`w-screen h-screen bg-white fixed top-0 left-0 flex flex-col items-center justify-center ${
        false ? "z-50" : "z-[-2] opacity-0"
      }`}
    >
      <BsXLg className="absolute top-[40px] right-[40px] text-[20px] cursor-pointer" />
      <div className="w-[76px] aspect-square rounded-full flex items-center justify-center bg-myGrey text-myGreen text-[36px]">
        <IoCheckmarkOutline />
      </div>
      <h1 className="text-[42px] font-semibold text-myDarkBlue mt-[40px]">
        Congrats!
      </h1>
      <p className="text-[14px] text-myDarkBlue2 mt-[16px]">
        Your order is placed successfully!
      </p>
      <div className="w-[214px] mt-[74px]">
        <Button text="Continue shopping" />
      </div>
    </div>
  );
}
