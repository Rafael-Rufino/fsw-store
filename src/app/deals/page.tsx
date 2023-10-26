import { Badge } from "@/components/ui/badge";

import { ShapesIcon } from "lucide-react";
import DealsList from "./components/deals-list";

const Deals = async () => {
  return (
    <div className="flex flex-col gap-8 p-5 ">
      <Badge
        variant="outline"
        className=" w-fit gap-1 border-2 border-primary px-3 py-2 text-base uppercase"
      >
        <ShapesIcon size={16} />
        Ofertas
      </Badge>
      <DealsList />
    </div>
  );
};

export default Deals;
