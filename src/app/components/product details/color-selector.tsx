import React from "react";

interface ColorSelectorProps {
  isLoading: boolean;
  colors: string[] | undefined;
  value: string;
  setValue: (val: string) => void;
}

export default function ColorSelector({
  isLoading,
  colors,
  value,
  setValue,
}: ColorSelectorProps) {
  return (
    <div>
      <p className="font-normal text-myDarkBlue mb-[16px]">Color: {value}</p>
      <div className="flex gap-[13px]">
        {isLoading &&
          [1, 2, 3, 4].map((gst) => (
            <div
              key={gst}
              className="w-[48px] aspect-square rounded-full bg-myGrey"
            ></div>
          ))}
        {colors?.map((color) => (
          <div
            key={color}
            onClick={() => setValue(color)}
            className={`w-[48px] aspect-square rounded-full border-[1px] cursor-pointer duration-100 shadow ${
              value === color ? "p-[3px]" : "p-0"
            }`}
            style={{ borderColor: color }}
          >
            <div
              style={{ backgroundColor: color }}
              className="w-full h-full rounded-full"
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
}
