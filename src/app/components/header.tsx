"use client";

import { useCartStore } from "@/store/cartStore";
import { useRouter } from "next/navigation";
import React from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { HiShoppingCart } from "react-icons/hi";
import { IoIosArrowDown } from "react-icons/io";

export default function Header() {
  const router = useRouter();
  const { openCart } = useCartStore();
  return (
    <div className="px-[100px] flex items-center justify-between h-[80px]">
      <img
        onClick={() => {
          router.push("/");
        }}
        src="/images/Logo (1).png"
        alt="logo"
        className="w-[180px] h-[24px] object-contain cursor-pointer"
      />
      {false ? (
        <div className="flex items-center gap-[20px]">
          <HiShoppingCart
            onClick={openCart}
            className="cursor-pointer text-[24px]"
          />
          <div className="flex items-center gap-[4px] cursor-pointer">
            <img
              onClick={() => {}}
              src="/images/logo.PNG"
              alt="logo"
              className="w-[40px] h-[40px] rounded-full object-cover"
            />
            <IoIosArrowDown />
          </div>
        </div>
      ) : (
        <div
          onClick={() => {
            router.push("/auth/login");
          }}
          className="flex items-center gap-[8px] cursor-pointer"
        >
          <BsFillPersonFill />
          <p className="text-[12px] font-medium">Log in</p>
        </div>
      )}
    </div>
  );
}
