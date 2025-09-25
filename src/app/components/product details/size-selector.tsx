import React from "react";

interface SizeSelectorProps {
  sizes: string[] | undefined;
  value: string;
  setValue: (val: string) => void;
}

export default function SizeSelector({ sizes, value, setValue }: SizeSelectorProps) {
  return (
    <div>
      <p className="font-normal text-myDarkBlue mb-[16px]">Size: {value}</p>
      <div className="flex gap-[8px]">
        {sizes?.map((size) => (
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
