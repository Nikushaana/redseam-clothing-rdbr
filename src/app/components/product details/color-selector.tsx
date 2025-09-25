import React from "react";

interface ColorSelectorProps {
  colors: string[] | undefined;
  value: string;
  setValue: (val: string) => void;
}

export default function ColorSelector({ colors, value, setValue }: ColorSelectorProps) {
  return (
    <div>
      <p className="font-normal text-myDarkBlue mb-[16px]">Color: {value}</p>
      <div className="flex gap-[13px]">
        {colors?.map((color) => (
          <div
            key={color}
            onClick={() => setValue(color)}
            className={`w-[48px] aspect-square rounded-full border-[1px] cursor-pointer duration-100 ${
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
