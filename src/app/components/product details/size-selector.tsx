import React from "react";

interface SizeSelectorProps {
  value: string;
  setValue: (val: string) => void;
}

export default function SizeSelector({ value, setValue }: SizeSelectorProps) {
  return (
    <div>
      <p className="font-normal text-myDarkBlue mb-[16px]">Size: {value}</p>
      <div className="flex gap-[8px]">
        {["XS", "S", "M", "L", "XL"].map((size) => (
          <div
            key={size}
            onClick={() => setValue(size)}
            className={`w-[70px] h-[42px] flex items-center justify-center rounded-[10px] border-[1px] cursor-pointer duration-100 ${
              value === size ? "border-myDarkBlue bg-myGrey" : "border-myGrey2"
            }`}
          >
            {size}
          </div>
        ))}
      </div>
    </div>
  );
}
