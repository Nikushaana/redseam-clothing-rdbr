"use client";

import Button from "@/app/components/button";
import DropDown from "@/app/components/dropdown/drop-down";
import ColorSelector from "@/app/components/product details/color-selector";
import Images from "@/app/components/product details/images";
import SizeSelector from "@/app/components/product details/size-selector";
import { axiosClient } from "@/lib/api";
import { useCartStore } from "@/store/cartStore";
import { useUserStore } from "@/store/userStore";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

interface ProductDetailsPageProps {
  params: Promise<{
    productId: string;
  }>;
}

export default function Page({ params }: ProductDetailsPageProps) {
  const { productId } = React.use(params);

  const user = useUserStore((state) => state.user);
  const { fetchCart } = useCartStore();

  const [productValues, setProductValues] = useState({
    color: "",
    size: "",
    quantity: "0",
    image: "",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isAddToCartLoading, setIsAddToCartLoading] = useState(false);
  const [productData, setProductData] = useState<Product | null>(null);

  const handleChange = (name: string, value: string) => {
    setProductValues((prev) => ({ ...prev, [name]: value }));
  };

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

  // Yup schema
  const schema = Yup.object().shape({
    color: Yup.string().required("Color is required"),
    size: Yup.string().required("Size is required"),
    quantity: Yup.string()
      .required("Quantity is required")
      .test("min-quantity", "Quantity must be min 1", (value) => {
        return value !== undefined && Number(value) > 0;
      }),
  });

  const HandleAddToCart = async () => {
    if (!user?.id) return;
    try {
      await schema.validate(productValues, { abortEarly: false });

      setIsAddToCartLoading(true);

      axiosClient
        .post(`/cart/products/${productId}`, {
          color: productValues.color,
          quantity: productValues.quantity,
          size: productValues.size,
        })
        .then((res: any) => {
          fetchCart();
        })
        .catch((error) => {
          toast.error("Failed to add in Cart", {
            position: "top-right",
            autoClose: 3000,
          });
        })
        .finally(() => {
          setIsAddToCartLoading(false);
        });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const newErrors: { [key: string]: string } = {};
        err.inner.forEach((e) => {
          if (e.path) {
            newErrors[e.path] = e.message;
            toast.error(e.message, {
              position: "top-right",
              autoClose: 3000,
            });
          }
        });
      }
    }
  };

  return (
    <div className="px-[100px] mt-[30px] mb-[90px]">
      <p className="text-[14px] text-myDarkBlue font-light mb-[49px]">
        Listing / Product
      </p>
      <div className="flex justify-between">
        <Images
          isLoading={isLoading}
          images={productData?.images}
          value={productValues.image}
          setValue={(val: string) => handleChange("image", val)}
        />

        <div className="w-[704px] flex flex-col gap-y-[56px]">
          <div>
            {isLoading ? (
              <div className="w-full h-[50px] bg-myGrey"></div>
            ) : (
              <h1 className="font-semibold text-[32px] text-myDarkBlue mb-[21px]">
                {productData?.name}
              </h1>
            )}
            {isLoading ? (
              <div className="w-1/2 h-[50px] bg-myGrey mt-[10px]"></div>
            ) : (
              <h1 className="font-semibold text-[32px] text-myDarkBlue">
                $ {productData?.price}
              </h1>
            )}
          </div>

          <ColorSelector
            isLoading={isLoading}
            colors={productData?.available_colors}
            value={productValues.color}
            setValue={(val: string) => handleChange("color", val)}
          />

          <SizeSelector
            isLoading={isLoading}
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

          <Button
            loading={isAddToCartLoading}
            text="Add to cart"
            click={HandleAddToCart}
            className="h-[59px] w-full text-[18px]"
          />

          <hr className="border-myGrey2" />

          <div>
            <div className="flex items-center justify-between mb-[7px]">
              <h2 className="text-[20px] font-medium">Details</h2>

              <div className="w-[109px] h-[61px]">
                {isLoading ? (
                  <div className="w-full h-full rounded-[10px] bg-myGrey"></div>
                ) : (
                  <img
                    src={productData?.brand?.image}
                    alt="logo"
                    className="w-full h-full object-contain"
                  />
                )}
              </div>
            </div>
            {isLoading ? (
              <div className="w-1/3 h-[40px] bg-myGrey mb-[10px]"></div>
            ) : (
              <p className="font-normal text-myDarkBlue2 mb-[19px]">
                Brand: {productData?.brand?.name}
              </p>
            )}
            {isLoading ? (
              <div className="w-full h-[80px] bg-myGrey"></div>
            ) : (
              <p className="font-normal text-myDarkBlue2">
                {productData?.description}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
