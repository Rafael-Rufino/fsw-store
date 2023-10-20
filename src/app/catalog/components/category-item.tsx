import { Category } from "@prisma/client";
import Image from "next/image";

interface CategoryItemProps {
  category: Category;
}

const CategoryItem = ({ category }: CategoryItemProps) => {
  return (
    <div className="flex flex-col ">
      <div className="bg-category-item-gradient flex h-[150px] w-full  flex-col items-center justify-center rounded-t-[10px] ">
        <Image
          src={category.imageUrl}
          alt={category.name}
          width={0}
          height={0}
          sizes="100vw"
          className="h-auto max-h-[70%] w-auto max-w-[80%]"
          style={{ objectFit: "contain" }}
        />
      </div>
      <div className="flex items-center justify-center rounded-b-[10px] bg-accent py-3">
        <span className="text-sm font-bold ">{category.name}</span>
      </div>
    </div>
  );
};

export default CategoryItem;
