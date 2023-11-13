"use client";

import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/button";

import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface SearchProductsProps {
  setInputSearch?: (type: boolean) => void;
}

const SearchProducts = ({ setInputSearch }: SearchProductsProps) => {
  const router = useRouter();

  const [search, setSearch] = useState<string>("");

  const handleSearchKeyUp = (key: any) => {
    if (key === "Enter" && search.trim() !== "") {
      if (setInputSearch) {
        setInputSearch(false);
      }
      router.push(
        `/products/search?product=${search.trim().toLocaleLowerCase()}`,
      );
    }
  };

  const handleSearchClick = () => {
    if (setInputSearch) {
      setInputSearch(false);
    }
    if (search.trim() !== "") {
      router.push(
        `/products/search?product=${search.trim().toLocaleLowerCase()}`,
      );
    }
  };

  return (
    <div className="relative mx-auto max-w-[600px]">
      <Input
        className="bg-accent pr-8 text-sm font-semibold"
        placeholder="Pesquise um produto"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyUp={(e) => handleSearchKeyUp(e.key)}
        autoFocus
      />
      <Button
        variant="secondary"
        className="absolute right-0 top-0"
        size="icon"
        onClick={handleSearchClick}
      >
        <SearchIcon />
      </Button>
    </div>
  );
};

export default SearchProducts;
