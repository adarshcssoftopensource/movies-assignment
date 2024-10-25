import React from "react";
import { Card, CardContent, CardFooter } from "./ui/card";
import Image from "next/image";
import Link from "next/link";
import DeleteDialog from "./DeleteDialog";
import { Edit } from "lucide-react";

interface MovieCard {
  id: string;
  image: string;
  title: string;
  dateOfPublish: string;
}

export default function MoviesCard({
  id,
  image,
  title,
  dateOfPublish,
}: MovieCard) {
  return (
    <Card className="group hover:scale-105 transition-all  ease-out duration-300 hover:shadow-2xl w-full">
      <CardContent className="p-2 relative">
        <Image
          src={`${process.env.NEXT_PUBLIC_BASE_URL}/${image}`}
          alt="product-image"
          className="rounded-xl w-full h-[400px] object-cover"
          width={100}
          height={100}
        />
      </CardContent>
      <CardFooter className="flex text-white  justify-between items-start p-4">
        <div className="flex flex-col">
          <p className="font-medium text-xl">{title}</p>
          <p className=" text-sm">{dateOfPublish}</p>
        </div>
        <div className="flex items-center p-2 gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out ">
          <Link href={`/movies/${id}`}>
            <Edit size={20} className="cursor-pointer" />
          </Link>
          <DeleteDialog id={id} />
        </div>
      </CardFooter>
    </Card>
  );
}
