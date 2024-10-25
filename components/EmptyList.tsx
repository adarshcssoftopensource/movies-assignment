import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

export default function EmptyList() {
  return (
    <div className="flex flex-col gap-14 justify-center  items-center min-h-screen">
      <h2>Your movie list is empty</h2>
      <Link href={"/movies/add"}>
        <Button>Add a new movie</Button>
      </Link>
    </div>
  );
}
