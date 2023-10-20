"use client";

import {
  HomeIcon,
  ListOrderedIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  PercentIcon,
  ShoppingCartIcon,
} from "lucide-react";

import { signIn, signOut, useSession } from "next-auth/react";

import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Button } from "./button";
import { Card } from "./card";
import { Separator } from "./separator";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "./sheet";

const Header = () => {
  const { status, data } = useSession();

  const handleLoginClick = async () => {
    await signIn();
  };

  const handleLogoutClick = async () => {
    await signOut();
  };

  const handleCatalogoLink = async () => {
    window.location.href = "/catalog";
  };

  const handleHomeLink = async () => {
    window.location.href = "/";
  };
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

          {status === "authenticated" && (
            <div className="flex flex-col">
              <div className="flex items-center gap-2 py-4">
                <Avatar>
                  <AvatarFallback>{data?.user?.name?.[0]}</AvatarFallback>
                  {data?.user?.image && <AvatarImage src={data?.user?.image} />}
                </Avatar>

                <div className="flex flex-col">
                  <span className="font-medium">{data?.user?.name} </span>
                  <p className="text-sm opacity-75">Boas compras!</p>
                </div>
              </div>
              <Separator />
            </div>
          )}
          <div className="mt-4 flex flex-col gap-4 p-[30px]">
            <Button
              variant="outline"
              className="gap-2"
              onClick={handleHomeLink}
            >
              <HomeIcon size={20} />
              Inicio
            </Button>
            {status === "unauthenticated" && (
              <Button
                onClick={handleLoginClick}
                variant="outline"
                className="gap-2"
              >
                <LogInIcon size={20} />
                Fazer login
              </Button>
            )}

            <Button variant="outline" className="gap-2">
              <PercentIcon size={20} /> Ofertas
            </Button>
            <Button
              variant="outline"
              className="gap-2"
              onClick={handleCatalogoLink}
            >
              <ListOrderedIcon size={20} />
              Catálago
            </Button>

            {status === "authenticated" && (
              <Button
                onClick={handleLogoutClick}
                variant="outline"
                className="gap-2"
              >
                <LogOutIcon size={20} />
                Fazer logout
              </Button>
            )}
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
