"use client";

import Button from "@/app/components/button";
import DropDown from "@/app/components/dropdown/drop-down";
import ColorSelector from "@/app/components/product details/color-selector";
import Images from "@/app/components/product details/images";
import SizeSelector from "@/app/components/product details/size-selector";
import { axiosClient } from "@/lib/api";
import { useUserStore } from "@/store/userStore";
import React, { useEffect, useState } from "react";

interface ProductDetailsPageProps {
  params: Promise<{
    productId: string;
  }>;
}

export default function Page({ params }: ProductDetailsPageProps) {
  const { productId } = React.use(params);

  const user = useUserStore((state) => state.user);

  const [productValues, setProductValues] = useState({
    color: "",
    size: "",
    quantity: "0",
    image: "",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [productData, setProductData] = useState<Product | null>(null);

  const handleChange = (name: string, value: string) => {
    setProductValues((prev) => ({ ...prev, [name]: value }));
  };

  console.log(productData);

  useEffect(() => {
    if (!user?.id) return;

    setIsLoading(true);
    axiosClient
      .get(`/products/${productId}`)
      .then((res: any) => {
        setProductData(res.data);
      })
      .catch((error) => {})
      .finally(() => {
        setIsLoading(false);
      });
  }, [user?.id, productId]);

  return (
    <div className="px-[100px] mt-[30px] mb-[90px]">
      <p className="text-[14px] text-myDarkBlue font-light mb-[49px]">
        Listing / Product
      </p>
      <div className="flex justify-between">
        <Images
          images={productData?.images}
          value={productValues.image}
          setValue={(val: string) => handleChange("image", val)}
        />

        <div className="w-[704px] flex flex-col gap-y-[56px]">
          <div>
            <h1 className="font-semibold text-[32px] text-myDarkBlue mb-[21px]">
              {productData?.name}
            </h1>
            <h1 className="font-semibold text-[32px] text-myDarkBlue">
              $ {productData?.price}
            </h1>
          </div>

          <ColorSelector
            colors={productData?.available_colors}
            value={productValues.color}
            setValue={(val: string) => handleChange("color", val)}
          />

          <SizeSelector
            sizes={productData?.available_sizes}
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
                  src={productData?.brand?.image}
                  alt="logo"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <p className="font-normal text-myDarkBlue2 mb-[19px]">
              Brand: {productData?.brand?.name}
            </p>
            <p className="font-normal text-myDarkBlue2">
              {productData?.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
