"use client";

import Image from "next/image";
import { useState } from "react";

interface ProductImagesProps {
  name: string;
  imageUrls: string[];
}

const ProductImages = ({ imageUrls, name }: ProductImagesProps) => {
  const [currentImageUrl, setCurrentImageUrl] = useState(imageUrls[0]);

  const handleImageClick = (imageUrl: string) => {
    setCurrentImageUrl(imageUrl);
  };
  return (
    <div className="flex flex-col lg:flex-row ">
      <div className="flex h-[320px] w-full items-center justify-center bg-accent lg:relative lg:h-full lg:rounded-[10px] lg:pl-28">
        <Image
          src={currentImageUrl}
          width={0}
          height={0}
          alt={name}
          sizes="100vw"
          className="h-full max-h-[340px] w-auto max-w-[80%]"
          style={{
            objectFit: "contain",
          }}
        />
      </div>

      <div className="mt-8 grid grid-cols-4 gap-4 p-5 lg:absolute lg:flex lg:flex-col ">
        {imageUrls.map((imageUrl) => (
          <button
            key={imageUrl}
            className={`flex h-[100px] items-center  justify-center rounded-lg  bg-accent lg:w-[100px] lg:rounded-2xl  lg:bg-black  ${
              imageUrl === currentImageUrl &&
              "border-2 border-solid border-primary"
            } `}
            onClick={() => handleImageClick(imageUrl)}
          >
            <Image
              src={imageUrl}
              width={0}
              height={0}
              alt={name}
              sizes="100vw"
              className="h-auto max-h-[70%] w-auto max-w-[80%]"
              style={{
                objectFit: "contain",
              }}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
