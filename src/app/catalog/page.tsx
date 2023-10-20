import { Badge } from "@/components/ui/badge";
import { ShapesIcon } from "lucide-react";
import CategoryList from "./components/category-list";

const CatalogPage = async () => {
  return (
    <div className="p-5">
      <Badge
        variant="outline"
        className="gap-1 border-2 border-primary px-3 py-2 text-base uppercase"
      >
        <ShapesIcon size={16} />
        Catálogo
      </Badge>
      <CategoryList />
    </div>
  );
};

export default CatalogPage;
