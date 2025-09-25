import React, { useState } from "react";
import CartCard from "../cards/cart-card";
import Button from "../button";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { axiosClient } from "@/lib/api";
import { useSuccessStore } from "@/store/successStore";
import * as Yup from "yup";
import { toast } from "react-toastify";

interface CartContentProps {
  isCheckout?: boolean;
  checkoutValues?: any;
}

export default function CartContent({
  isCheckout,
  checkoutValues,
}: CartContentProps) {
  const router = useRouter();
  const { cart, closeCart } = useCartStore();
  const { openSuccess } = useSuccessStore();

  const subtotal = cart.reduce((acc, curr) => acc + curr.total_price, 0);

  const [isLoading, setIsLoading] = useState(false);

  // Yup schema
  const schema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    surname: Yup.string().required("Surname is required"),
    email: Yup.string()
      .email("Invalid email format")
      .min(3, "Email must be at least 3 characters")
      .required("Email is required"),
    address: Yup.string().required("Address is required"),
    zipCode: Yup.number().required("Zip code is required"),
  });

  const HandleCheckout = async () => {
    try {
      await schema.validate(checkoutValues, { abortEarly: false });

      setIsLoading(true);

      axiosClient
        .post(`/cart/checkout`, {
          name: checkoutValues.name,
          surname: checkoutValues.surname,
          email: checkoutValues.email,
          address: checkoutValues.address,
          zip_code: checkoutValues.zipCode,
        })
        .then((res: any) => {
          router.push("/");
          openSuccess();
        })
        .catch((error) => {
          toast.error(error.response.data.message, {
            position: "top-right",
            autoClose: 3000,
          });
        })
        .finally(() => {
          setIsLoading(false);
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
    <div className="flex flex-col justify-between h-full">
      <div className="flex flex-col gap-y-[36px] flex-1 overflow-y-scroll showScroll">
        {cart.map((prod) => (
          <CartCard key={prod.id} {...prod} />
        ))}
      </div>

      <div>
        <div className="flex flex-col gap-y-[16px] mt-[20px]">
          <div className="flex items-center justify-between font-normal text-myDarkBlue2">
            <p>Items subtotal</p>
            <p>$ {subtotal}</p>
          </div>
          <div className="flex items-center justify-between font-normal text-myDarkBlue2">
            <p>Delivery</p>
            <p>$ 5</p>
          </div>
          <div className="flex items-center justify-between text-[20px] font-normal text-myDarkBlue">
            <h2>Total</h2>
            <h2>$ {subtotal + 5}</h2>
          </div>
        </div>

        <Button
          loading={isLoading}
          text={isCheckout ? "Pay" : "Go to checkout"}
          click={() => {
            if (isCheckout) {
              HandleCheckout();
            } else {
              closeCart();
              router.push("/checkout");
            }
          }}
          className="h-[59px] w-full text-[18px] mt-[102px]"
        />
      </div>
    </div>
  );
}
