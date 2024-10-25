import { CirclePlus, LogOut } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

export default function MoviesCollectionHeader() {
  return (
    <header className="flex justify-between items-center gap-2 xl:mb-32 lg:mb-20 md:mb-15 mb-10">
      <Link href={"/movies/add"} className="flex gap-2 items-center">
        <h2 className="xl:text-5xl lg:text-3xl md:text-2xl text-xl">
          My Movies
        </h2>
        <CirclePlus />
      </Link>
      <Link href={"/login"}>
        <Button variant={"link"} className="text-white">
          Logout
          <LogOut />
        </Button>
      </Link>
    </header>
  );
}
