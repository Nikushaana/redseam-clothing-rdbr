import React from "react";

interface ColorSelectorProps {
  value: string;
  setValue: (val: string) => void;
}

const ColorData = [
  { clr: "Periwinkle Purple", clrCode: "#C8B5FD" },
  { clr: "Baby Pink", clrCode: "#F3E7EB" },
  { clr: "Light Khaki", clrCode: "#F3DCA7" },
];

export default function ColorSelector({ value, setValue }: ColorSelectorProps) {
  return (
    <div>
      <p className="font-normal text-myDarkBlue mb-[16px]">Color: {value}</p>
      <div className="flex gap-[13px]">
        {ColorData.map((color) => (
          <div
            key={color.clr}
            onClick={() => setValue(color.clr)}
            className={`w-[48px] aspect-square rounded-full border-[1px] cursor-pointer duration-100 ${
              value === color.clr ? "p-[3px]" : "p-0"
            }`}
            style={{ borderColor: color.clrCode }}
          >
            <div
              style={{ backgroundColor: color.clrCode }}
              className="w-full h-full rounded-full"
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
}
