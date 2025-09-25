"use client";

import React, { useEffect } from "react";
import { BsXLg } from "react-icons/bs";
import Button from "../button";
import CartContent from "../cart/cart-content";
import { useCartStore } from "@/store/cartStore";
import { useRouter } from "next/navigation";

export default function Cart() {
  const router = useRouter();
  const { isOpen, closeCart, cart, fetchCart } = useCartStore();

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div onClick={closeCart}
      className={`fixed inset-0 w-screen h-screen bg-[#0000004b] flex justify-end ${
        !isOpen && "z-[-2] opacity-0"
      }`}
    >
      <div onClick={(e) => e.stopPropagation()} className="bg-white w-[540px] h-full p-[40px]">
        <div className="flex items-center justify-between h-[40px]">
          <h1 className="text-[20px] font-medium text-myDarkBlue">
            Shopping cart ({cart.length})
          </h1>
          <BsXLg onClick={closeCart} className="cursor-pointer" />
        </div>

        {cart.length > 0 ? (
          <div className="mt-[63px] h-[calc(100%-103px)]">
            <CartContent />
          </div>
        ) : (
          <div className="flex flex-col items-center mt-[151px]">
            <img
              src="/images/Making Credit Purchase Online Securely.png"
              alt="cart"
              className="w-[170px] h-[135px] object-contain mb-[24px]"
            />
            <h1 className="text-[24px] font-semibold text-myDarkBlue mb-[10px]">
              Ooops!
            </h1>
            <p className="text-[14px] text-myDarkBlue2 mb-[58px]">
              You’ve got nothing in your cart just yet...
            </p>
            <Button
              click={() => {
                closeCart();
                router.push("/");
              }}
              text="Start shopping"
              className="w-[214px] h-[41px]"
            />
          </div>
        )}
      </div>
    </div>
  );
}
