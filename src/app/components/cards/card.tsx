import { useRouter } from "next/navigation";
import React from "react";

export default function Card() {
  const router = useRouter();
  return (
    <div onClick={() => router.push(`/product/1`)} className="cursor-pointer">
      <div className="h-[549px] rounded-[10px] bg-myGrey overflow-hidden">
        <img
          src="/images/Logo (1).png"
          alt="logo"
          className="w-full h-full object-contain"
        />
      </div>
      <h2 className="text-[18px] font-medium text-myDarkBlue">
        Kids` Curved Hilfiger Graphic T-Shirt
      </h2>
      <h2 className="font-medium text-myDarkBlue">$ 25</h2>
    </div>
  );
}
