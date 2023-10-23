import { Badge } from "@/components/ui/badge";
import { ShapesIcon } from "lucide-react";
import CatalogList from "./components/catalog-list";

const CatalogPage = async () => {
  return (
    <div className="p-5">
      <Badge
        variant="outline"
        className=" w-fit gap-1 border-2 border-primary px-3 py-2 text-base uppercase"
      >
        <ShapesIcon size={16} />
        Catálogo
      </Badge>
      <CatalogList />
    </div>
  );
};

export default CatalogPage;
