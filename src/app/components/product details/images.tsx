import React from "react";

interface ImagesProps {
  images: string[] | undefined;
  value: string;
  setValue: (val: string) => void;
}

export default function Images({ images, value, setValue }: ImagesProps) {
  return (
    <div className="flex gap-[24px]">
      <div className="flex flex-col gap-y-[9px] w-[121px]">
        {images?.map((img) => (
          <div
            key={img}
            onClick={() => setValue(img)}
            className="w-full h-[161px]"
          >
            <img
              src={img}
              alt="prodimage"
              className="w-full h-full object-contain cursor-pointer"
            />
          </div>
        ))}
      </div>
      <div className="w-[703px] h-[937px]">
        <img
          src={value || images?.[0]}
          alt="logo"
          className="w-full h-full object-contain cursor-pointer"
        />
      </div>
    </div>
  );
}
