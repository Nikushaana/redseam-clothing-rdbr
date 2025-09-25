"use client";

import Button from "@/app/components/button";
import Input from "@/app/components/inputs/input";
import { axiosClient } from "@/lib/api";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

export default function Page() {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);
  
  const [loginValues, setLoginValues] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Yup schema
  const schema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .min(3, "Email must be at least 3 characters")
      .required("Email is required"),
    password: Yup.string()
      .min(3, "Password must be at least 3 characters")
      .required("Password is required"),
  });

  // helper to update one field
  const handleChange = (name: string, value: string) => {
    setLoginValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      await schema.validate(loginValues, { abortEarly: false });
      setErrors({});

      setIsLoading(true);

      axiosClient
        .post("/login", {
          email: loginValues.email,
          password: loginValues.password,
        })
        .then((res: any) => {
          setUser(res.data.user, res.data.token);

          router.push("/");
          toast.success("user logged in successfully", {
            position: "top-right",
            autoClose: 3000,
          });
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
          if (e.path) newErrors[e.path] = e.message;
        });
        setErrors(newErrors);
      }
    }
  };

  return (
    <div className="flex flex-col gap-y-[24px] w-full">
      <h1 className="text-[42px] font-semibold text-myDarkBlue mb-[24px]">
        Log in
      </h1>
      <Input
        text="Email"
        name="email"
        value={loginValues.email}
        setValue={(val: string) => handleChange("email", val)}
        isError={errors.email}
      />
      <Input
        text="Password"
        name="password"
        type="password"
        value={loginValues.password}
        setValue={(val: string) => handleChange("password", val)}
        isError={errors.password}
      />
      <Button
        loading={isLoading}
        text="Log in"
        click={handleSubmit}
        className="mt-[22px] text-[14px] h-[41px] w-full"
      />
      <p className="text-center text-myDarkBlue2 font-normal text-[14px]">
        Not a member?{" "}
        <span
          onClick={() => {
            router.push("/auth/registration");
          }}
          className="text-myRed font-medium cursor-pointer"
        >
          Register
        </span>
      </p>
    </div>
  );
}
