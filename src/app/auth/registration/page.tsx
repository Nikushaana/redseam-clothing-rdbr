"use client";

import Button from "@/app/components/button";
import Input from "@/app/components/inputs/input";
import UploadImage from "@/app/components/inputs/upload-image";
import { axiosClient } from "@/lib/api";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

export default function Page() {
  const router = useRouter();

  const [registerValues, setRegisterValues] = useState({
    newImage: null as File | null,
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Yup schema
  const schema = Yup.object().shape({
    username: Yup.string()
      .min(3, "Username must be at least 3 characters")
      .required("Username is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(3, "Password must be at least 3 characters")
      .required("Password is required"),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
  });

  // helper to update one field
  const handleChange = (name: string, value: string | File | null) => {
    setRegisterValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      await schema.validate(registerValues, { abortEarly: false });
      setErrors({});

      setIsLoading(true);

      const formData = new FormData();
      formData.append("username", registerValues.username);
      formData.append("email", registerValues.email);
      formData.append("password", registerValues.password);
      formData.append(
        "password_confirmation",
        registerValues.password_confirmation
      );

      if (registerValues.newImage instanceof File) {
        formData.append("avatar", registerValues.newImage);
      }

      axiosClient
        .post("/register", formData)
        .then((res: any) => {
          localStorage.setItem("redseamToken", res.data.token);

          router.push("/auth/login");
          toast.success("user registered successfully", {
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
        Registration
      </h1>
      <UploadImage
        name="newImage"
        value={registerValues.newImage}
        setValue={(file: File | null) => handleChange("newImage", file)}
      />
      <Input
        text="Username"
        name="username"
        value={registerValues.username}
        setValue={(val: string) => handleChange("username", val)}
        isError={errors.username}
      />
      <Input
        text="Email"
        name="email"
        value={registerValues.email}
        setValue={(val: string) => handleChange("email", val)}
        isError={errors.email}
      />
      <Input
        text="Password"
        name="password"
        type="password"
        value={registerValues.password}
        setValue={(val: string) => handleChange("password", val)}
        isError={errors.password}
      />
      <Input
        text="Confirm password"
        name="password_confirmation"
        type="password"
        value={registerValues.password_confirmation}
        setValue={(val: string) => handleChange("password_confirmation", val)}
        isError={errors.password_confirmation}
      />
      <Button
        loading={isLoading}
        text="Register"
        click={handleSubmit}
        className="mt-[22px] text-[14px] h-[41px] w-full"
      />
      <p className="text-center text-myDarkBlue2 font-normal text-[14px]">
        Already member?{" "}
        <span
          onClick={() => {
            router.push("/auth/login");
          }}
          className="text-myRed font-medium cursor-pointer"
        >
          Log in
        </span>
      </p>
    </div>
  );
}
