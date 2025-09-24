import React from "react";
import Counter from "../cart/counter";

export default function CartCard() {
  return (
    <div className="flex gap-[17px] ">
      <div className="w-[100px] h-[134px] rounded-[10px] border-[1px] border-myGrey2 overflow-hidden">
        <img
          src="/images/Logo (1).png"
          alt="logo"
          className="w-full h-full object-contain"
        />
      </div>
      <div className="flex flex-col gap-y-[8px] flex-1">
        <div className="flex items-center justify-between">
          <h2 className="text-[14px] font-medium text-myDarkBlue">
            Kids` Curved Hilfiger Graphic T-Shirt
          </h2>
          <h2 className="text-[18px] font-medium text-myDarkBlue">$25</h2>
        </div>
        <p className="text-[12px] text-myDarkBlue2 font-normal">Baby Pink</p>
        <p className="text-[12px] text-myDarkBlue2 font-normal">L</p>

        <div className="flex items-center justify-between mt-[5px]">
          <Counter />
          <p className="text-[12px] text-myDarkBlue2 cursor-pointer">Remove</p>
        </div>
      </div>
    </div>
  );
}
