import Image, { ImageProps } from "next/image";

const PromoBanner = ({ alt, src, ...props }: ImageProps) => {
  return (
    <Image
      src={src}
      height={0}
      width={0}
      className="mx-auto h-auto w-full px-5 md:w-3/4  "
      alt={alt}
      {...props}
      sizes="100vw"
    />
  );
};

export default PromoBanner;
