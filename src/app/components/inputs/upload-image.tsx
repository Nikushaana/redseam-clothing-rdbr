"use client";

import React, { useRef, useState, useEffect } from "react";
import { BsCameraFill } from "react-icons/bs";

interface UploadImageProps {
  name: string;
  value: File | null; // store the File object
  setValue: (val: File | null) => void;
}

export default function UploadImage({
  name,
  value,
  setValue,
}: UploadImageProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string>("");

  useEffect(() => {
    if (!value) {
      setPreview("");
      return;
    }
    const objectUrl = URL.createObjectURL(value);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [value]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (file) {
      setValue(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = () => {
    setValue(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="flex items-center gap-[15px]">
      <div
        className={`w-[100px] aspect-square flex items-center justify-center rounded-full overflow-hidden ${
          !preview && "border-[1px] border-myGrey2 "
        }`}
      >
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="w-full h-full object-cover"
          />
        ) : (
          <BsCameraFill className="text-[20px]" />
        )}
      </div>

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
        {preview ? "Upload new image" : "Upload image"}
      </p>

      {preview && (
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
