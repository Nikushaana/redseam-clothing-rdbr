import React from "react";
import Counter from "../cart/counter";
import { useCartStore } from "@/store/cartStore";

interface CartCardProps {
  cover_image: string;
  name: string;
  total_price: number;
  color: string;
  size: string;
  quantity: number;
  id: number;
}

export default function CartCard({
  cover_image,
  name,
  total_price,
  color,
  size,
  quantity,
  id,
}: CartCardProps) {
  const { isLoaderProd, deleteCartProduct } = useCartStore();

  const handleDelete = (id: number) => {
    deleteCartProduct(id);
  };
  return (
    <div
      className={`flex gap-[17px] ${
        isLoaderProd == id && "pointer-events-none opacity-[0.5]"
      }`}
    >
      <div className="w-[100px] h-[134px] rounded-[10px] border-[1px] border-myGrey2 overflow-hidden">
        <img
          src={cover_image}
          alt="logo"
          className="w-full h-full object-contain"
        />
      </div>
      <div className="flex flex-col gap-y-[8px] flex-1">
        <div className="flex items-center justify-between">
          <h2 className="text-[14px] font-medium text-myDarkBlue">{name}</h2>
          <h2 className="text-[18px] font-medium text-myDarkBlue">
            $ {total_price}
          </h2>
        </div>
        <p className="text-[12px] text-myDarkBlue2 font-normal">{color}</p>
        <p className="text-[12px] text-myDarkBlue2 font-normal">{size}</p>

        <div className="flex items-center justify-between mt-[5px]">
          <Counter id={id} quantity={quantity} />
          <p
            onClick={() => handleDelete(id)}
            className="text-[12px] text-myDarkBlue2 cursor-pointer"
          >
            Remove
          </p>
        </div>
      </div>
    </div>
  );
}
