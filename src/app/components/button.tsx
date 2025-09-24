import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { HiOutlineShoppingCart } from "react-icons/hi";

interface buttonProps {
  loading?: boolean;
  text: string;
  click?: () => void;
  className?: string;
}

export default function Button({
  loading,
  text,
  click,
  className,
}: buttonProps) {
  return (
    <div
      onClick={click}
      className={`${className} ${
        loading && "pointer-events-none opacity-[0.5]"
      } flex items-center gap-[10px] justify-center cursor-pointer bg-myRed text-white rounded-[10px] font-normal`}
    >
      {loading ? (
        <AiOutlineLoading3Quarters className="animate-spin" />
      ) : (
        <>
          {text === "Add to cart" && <HiOutlineShoppingCart />}
          <h1>{text}</h1>
        </>
      )}
    </div>
  );
}
