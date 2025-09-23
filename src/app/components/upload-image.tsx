"use client";

import React, { useRef, useState } from "react";
import { BsCameraFill } from "react-icons/bs";

interface imageType {
  name: string;
  value: string;
  setValue: (val: string) => void;
}

export default function UploadImage({ name, value, setValue }: imageType) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setValue(reader.result as string); // preview image
      };
      reader.readAsDataURL(file);
    }
  };

  // Open hidden input on text click
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // Remove image
  const handleRemove = () => {
    setValue("");
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // reset input
    }
  };

  return (
    <div className="flex items-center gap-[15px]">
      <div
        className={`w-[100px] aspect-square flex items-center justify-center rounded-full overflow-hidden ${
          !value && "border-[1px] border-myGrey2 "
        }`}
      >
        {value ? (
          <img
            src={value}
            alt="Uploaded preview"
            className="w-full h-full object-cover"
          />
        ) : (
          <BsCameraFill className="text-[20px]" />
        )}
      </div>

      {/* Hidden input for selecting image */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      <p
        onClick={handleUploadClick}
        className="cursor-pointer text-[14px] text-myDarkBlue2"
      >
        Upload {value ? `new` : `image`}
      </p>

      {value && (
        <p
          onClick={handleRemove}
          className="cursor-pointer text-[14px] text-myDarkBlue2"
        >
          Remove
        </p>
      )}
    </div>
  );
}
