"use client";

import { useCartStore } from "@/store/cartStore";
import React, { useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";

interface CounterProps {
  id: number;
  quantity: number;
}

export default function Counter({ id, quantity }: CounterProps) {
  const { updateCartProduct } = useCartStore();

  const [count, setCount] = useState(quantity);

  const increment = () => {
    setCount((prev) => {
      const newCount = prev + 1;
      updateCartProduct(id, newCount);
      return newCount;
    });
  };

  const decrement = () => {
    setCount((prev) => {
      const newCount = prev > 1 ? prev - 1 : 1;
      updateCartProduct(id, newCount);
      return newCount;
    });
  };

  return (
    <div className="flex items-center justify-center gap-[6px] rounded-[22px] border-[1px] border-myGrey2 h-[26px] w-[70px]">
      <FiMinus
        onClick={decrement}
        className={`text-[14px] ${
          count == 1 ? "text-myGrey2 pointer-events-none" : "cursor-pointer"
        }`}
      />
      <p className="text-[12px] font-normal text-myDarkBlue2 select-none">
        {count}
      </p>
      <FiPlus onClick={increment} className="text-[14px] cursor-pointer" />
    </div>
  );
}
