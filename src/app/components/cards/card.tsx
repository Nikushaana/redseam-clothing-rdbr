import { useRouter } from "next/navigation";
import React from "react";

interface CardProps {
  cover_image: string;
  name: string;
  price: number;
  id: number;
}

export default function Card({ cover_image, name, price, id }: CardProps) {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/product/${id}`)}
      className="cursor-pointer"
    >
      <div className="h-[549px] rounded-[10px] overflow-hidden">
        <img
          src={cover_image}
          alt="logo"
          className="w-full h-full object-contain"
        />
      </div>
      <h2 className="text-[18px] font-medium text-myDarkBlue">{name}</h2>
      <h2 className="font-medium text-myDarkBlue">$ {price}</h2>
    </div>
  );
}
