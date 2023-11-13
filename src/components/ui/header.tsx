"use client";

import {
  HomeIcon,
  ListOrderedIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  PercentIcon,
  SearchIcon,
  ShoppingCartIcon,
} from "lucide-react";

import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signIn, signOut, useSession } from "next-auth/react";

import SearchProducts from "@/app/(home)/components/search-products";
import { motion } from "framer-motion";
import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

import { Badge } from "./badge";
import { Button } from "./button";
import { Card } from "./card";
import Cart from "./cart";
import { Separator } from "./separator";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "./sheet";

const Header = () => {
  const { status, data } = useSession();

  const handleLoginClick = async () => {
    await signIn();
  };

  const handleLogoutClick = async () => {
    await signOut();
  };
  const [inputSearch, setInputSearch] = useState<boolean>(false);

  return (
    <Card className="flex justify-between p-[30px]">
      <div className="lg:hidden">
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
                    {data?.user?.image && (
                      <AvatarImage src={data?.user?.image} />
                    )}
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
              <SheetClose asChild>
                <Link href="/">
                  <Button variant="outline" className="w-full  gap-2">
                    <HomeIcon size={20} />
                    Inicio
                  </Button>
                </Link>
              </SheetClose>

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
              <SheetClose asChild>
                <Link href="/deals">
                  <Button variant="outline" className="w-full  gap-2">
                    <PercentIcon size={20} /> Ofertas
                  </Button>
                </Link>
              </SheetClose>

              <SheetClose asChild>
                <Link href="/catalog">
                  <Button variant="outline" className="w-full  gap-2">
                    <ListOrderedIcon size={20} />
                    Catálago
                  </Button>
                </Link>
              </SheetClose>

              {status === "authenticated" && (
                <Button
                  onClick={handleLogoutClick}
                  variant="outline"
                  className="w-full  gap-2"
                >
                  <LogOutIcon size={20} />
                  Fazer logout
                </Button>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <Link href="/" className="flex items-center justify-center gap-1">
        <h1 className=" text-lg font-semibold">
          <span className="text-primary"> FSW </span>
          Store
        </h1>
      </Link>

      <div className="  hidden flex-row  items-center justify-center md:block">
        <div className=" mt-4 flex items-center  justify-center gap-4 ">
          <Link href="/">
            <Button variant="ghost" className="w-full  gap-2">
              <HomeIcon size={20} />
              Inicio
            </Button>
          </Link>

          <Link href="/deals">
            <Button variant="ghost" className="w-full  gap-2">
              <PercentIcon size={20} /> Ofertas
            </Button>
          </Link>

          <Link href="/catalog">
            <Button variant="ghost" className="w-full  gap-2">
              <ListOrderedIcon size={20} />
              Catálago
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex  flex-row items-center justify-center gap-4">
        <div className="relative hidden flex-row items-center gap-4  lg:flex">
          <div className="relative hidden lg:block">
            {inputSearch && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "230px" }}
                exit={{ opacity: 0, width: 0 }}
                onBlur={() => setInputSearch(false)}
                className="absolute right-0 top-0 w-[230px]"
              >
                <SearchProducts setInputSearch={setInputSearch} />
              </motion.span>
            )}
            <Button
              variant="outline"
              size="icon"
              className="items-center justify-center lg:flex"
              onClick={() => setInputSearch(true)}
            >
              <SearchIcon />
            </Button>
          </div>
          {status === "authenticated" && (
            <DropdownMenu>
              <DropdownMenuTrigger>
                {status === "authenticated" && (
                  <div className="flex items-center">
                    <Avatar>
                      <AvatarFallback>{data?.user?.name?.[0]}</AvatarFallback>
                      {data?.user?.image && (
                        <AvatarImage src={data?.user?.image} />
                      )}
                    </Avatar>
                  </div>
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {status === "authenticated" && (
                  <Button
                    onClick={handleLogoutClick}
                    variant="ghost"
                    className="w-full  gap-2"
                  >
                    <LogOutIcon size={20} />
                    Fazer logout
                  </Button>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {status === "unauthenticated" && (
            <Button
              onClick={handleLoginClick}
              variant="ghost"
              className="gap-2"
            >
              <LogInIcon size={20} />
              Fazer login
            </Button>
          )}
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline">
              <ShoppingCartIcon />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader className="text-lef text-lg font-semibold">
              <Badge
                variant="outline"
                className="w-fit gap-1 border-2 border-primary px-3 py-2 text-base uppercase"
              >
                <ShoppingCartIcon size={16} />
                Carrinho
              </Badge>
            </SheetHeader>
            <Cart />
          </SheetContent>
        </Sheet>
      </div>
    </Card>
  );
};

export default Header;
