import { cn } from "@/lib/utils";
import Image, { ImageProps } from "next/image";

const PromoBanner = ({ alt, src, className, ...props }: ImageProps) => {
  return (
    <Image
      src={src}
      height={0}
      width={0}
      className={cn(className, "mx-auto h-auto w-full ")}
      alt={alt}
      sizes="100vw"
      {...props}
    />
  );
};

export default PromoBanner;
