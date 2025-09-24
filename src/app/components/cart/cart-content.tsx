import React from "react";
import CartCard from "../cards/cart-card";
import Button from "../button";
import { useRouter } from "next/navigation";

interface CartContentProps {
  isCheckout?: boolean;
}

export default function CartContent({ isCheckout }: CartContentProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex flex-col gap-y-[36px] flex-1 overflow-y-scroll showScroll">
        {[1, 2].map((prod) => (
          <CartCard key={prod} />
        ))}
      </div>

      <div>
        <div className="flex flex-col gap-y-[16px] mt-[20px]">
          <div className="flex items-center justify-between font-normal text-myDarkBlue2">
            <p>Items subtotal</p>
            <p>$ 50</p>
          </div>
          <div className="flex items-center justify-between font-normal text-myDarkBlue2">
            <p>Delivery</p>
            <p>$ 5</p>
          </div>
          <div className="flex items-center justify-between text-[20px] font-normal text-myDarkBlue">
            <h2>Total</h2>
            <h2>$ 55</h2>
          </div>
        </div>

        <Button
          text={isCheckout ? "Pay" : "Go to checkout"}
          click={() => router.push("/")}
          className="h-[59px] w-full text-[18px] mt-[102px]"
        />
      </div>
    </div>
  );
}
