"use client";

import Button from "@/app/components/button";
import DropDown from "@/app/components/dropdown/drop-down";
import ColorSelector from "@/app/components/product details/color-selector";
import Images from "@/app/components/product details/images";
import SizeSelector from "@/app/components/product details/size-selector";
import React, { useState } from "react";

interface ProductDetailsPageProps {
  params: Promise<{
    productId: string;
  }>;
}

export default function Page({ params }: ProductDetailsPageProps) {
  const { productId } = React.use(params);

  const [productValues, setProductValues] = useState({
    color: "",
    size: "",
    quantity: "0",
  });

  const handleChange = (name: string, value: string) => {
    setProductValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="px-[100px] mt-[30px] mb-[90px]">
      <p className="text-[14px] text-myDarkBlue font-light mb-[49px]">
        Listing / Product
      </p>
      <div className="flex justify-between">
        <Images />

        <div className="w-[704px] flex flex-col gap-y-[56px]">
          <div>
            <h1 className="font-semibold text-[32px] text-myDarkBlue mb-[21px]">
              Kids' Curved Hilfiger Graphic T-Shirt
            </h1>
            <h1 className="font-semibold text-[32px] text-myDarkBlue">$ 25</h1>
          </div>

          <ColorSelector
            value={productValues.color}
            setValue={(val: string) => handleChange("color", val)}
          />

          <SizeSelector
            value={productValues.size}
            setValue={(val: string) => handleChange("size", val)}
          />

          <div>
            <p className="font-normal text-myDarkBlue mb-[16px]">Quantity</p>
            <DropDown
              value={productValues.quantity}
              setValue={(val: string) => handleChange("quantity", val)}
            />
          </div>

          <Button text="Add to cart" className="h-[59px] w-full text-[18px]" />

          <hr className="border-myGrey2" />

          <div>
            <div className="flex items-center justify-between mb-[7px]">
              <h2 className="text-[20px] font-medium">Details</h2>

              <div className="w-[109px] h-[61px]">
                <img
                  src="/images/Logo (1).png"
                  alt="logo"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <p className="font-normal text-myDarkBlue2 mb-[19px]">
              Brand: Tommy Hilfiger
            </p>
            <p className="font-normal text-myDarkBlue2">
              This product contains regenerative cotton, which is grown using
              farming methods that seek to improve soil health, watersheds and
              biodiversity.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
