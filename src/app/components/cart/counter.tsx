"use client";

import React, { useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";

export default function Counter() {
  const [count, setCount] = useState(1);

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="flex items-center justify-center gap-[6px] rounded-[22px] border-[1px] border-myGrey2 h-[26px] w-[70px]">
      <FiMinus onClick={decrement} className="text-[14px] cursor-pointer" />
      <p className="text-[12px] font-normal text-myDarkBlue2 select-none">
        {count}
      </p>
      <FiPlus onClick={increment} className="text-[14px] cursor-pointer" />
    </div>
  );
}
