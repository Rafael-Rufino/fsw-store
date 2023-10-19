import {
  HomeIcon,
  ListOrderedIcon,
  LogInIcon,
  MenuIcon,
  PercentIcon,
  ShoppingCartIcon,
} from "lucide-react";
import { Button } from "./button";
import { Card } from "./card";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "./sheet";

const Header = () => {
  return (
    <Card className="flex justify-between p-[30px]">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline">
            <MenuIcon />
          </Button>
        </SheetTrigger>

        <SheetContent side="left">
          <SheetHeader className="text-left text-lg font-semibold">
            Menu
          </SheetHeader>
          <div className="flex flex-col gap-4 p-[30px]">
            <Button variant="outline" className="gap-2">
              <HomeIcon size={20} />
              Inicio
            </Button>
            <Button variant="outline" className="gap-2">
              <LogInIcon size={20} />
              Fazer login
            </Button>
            <Button variant="outline" className="gap-2">
              <PercentIcon size={20} /> Ofertas
            </Button>
            <Button variant="outline" className="gap-2">
              <ListOrderedIcon size={20} />
              Catálago
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      <h1 className="text-lg font-semibold">
        <span className="text-primary"> FSW </span>
        Store
      </h1>

      <Button size="icon" variant="outline">
        <ShoppingCartIcon />
      </Button>
    </Card>
  );
};

export default Header;
