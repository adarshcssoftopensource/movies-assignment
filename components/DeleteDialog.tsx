"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Movie } from "@/types/movies";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

export default function DeleteDialog({
  id,
  setMovies,
  setCurrentPage,
}: {
  id: string;
  setMovies: Dispatch<SetStateAction<Movie[]>>;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}) {
  const router = useRouter();
  async function onDelete() {
    try {
      const url = `/api/movie/${id}`;

      const response = await fetch(url, {
        method: "DELETE",
      });

      const result = await response.json();

      if (result.success) {
        toast.success(result.message);
        setMovies((prevMovies: Movie[]) =>
          prevMovies.filter((movie: Movie) => movie._id !== id)
        );
        setCurrentPage(1);
      } else {
        toast.error(result.message);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(`Something went wrong.`);
    }
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Trash size={20} className=" cursor-pointer" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your data
            from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
