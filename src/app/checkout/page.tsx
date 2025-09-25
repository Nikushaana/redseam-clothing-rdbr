"use client";

import React, { useEffect, useState } from "react";
import Input from "../components/inputs/input";
import CartContent from "../components/cart/cart-content";
import { useUserStore } from "@/store/userStore";

export default function page() {
  const { user } = useUserStore();

  const [checkoutValues, setCheckoutValues] = useState({
    name: "",
    surname: "",
    email: "",
    address: "",
    zipCode: "",
  });

  useEffect(() => {
    setCheckoutValues((prev) => ({ ...prev, email: user?.email || "" }));
  }, [user?.email]);

  // helper to update one field
  const handleChange = (name: string, value: string) => {
    setCheckoutValues((prev) => ({ ...prev, [name]: value }));
  };
  
  return (
    <div className="px-[100px] mt-[72px]">
      <h1 className="text-[42px] text-myDarkBlue mb-[42px]">Checkout</h1>
      <div className="flex gap-[131px]">
        <div className="rounded-[16px] bg-myGrey px-[47px] py-[60px] h-[635px] w-[1129px]">
          <h2 className="text-[22px] text-myDarkBlue2 font-medium mb-[46px]">
            Order details
          </h2>
          <div className="w-[578px] grid grid-cols-2 gap-[24px]">
            <Input
              text="Name"
              name="name"
              value={checkoutValues.name}
              setValue={(val: string) => handleChange("name", val)}
              isCheckout={true}
            />
            <Input
              text="Surname"
              name="surname"
              value={checkoutValues.surname}
              setValue={(val: string) => handleChange("surname", val)}
              isCheckout={true}
            />
            <div className="col-span-2">
              <Input
                text="Email"
                name="email"
                value={checkoutValues.email}
                setValue={(val: string) => handleChange("email", val)}
                isCheckout={true}
                isEmail={true}
              />
            </div>
            <Input
              text="Address"
              name="address"
              value={checkoutValues.address}
              setValue={(val: string) => handleChange("address", val)}
              isCheckout={true}
            />
            <Input
              text="Zip code"
              name="zipCode"
              value={checkoutValues.zipCode}
              setValue={(val: string) => handleChange("zipCode", val)}
              isCheckout={true}
            />
          </div>
        </div>
        <div className="w-[460px] h-[635px]">
          <CartContent isCheckout={true} checkoutValues={checkoutValues}/>
        </div>
      </div>
    </div>
  );
}
