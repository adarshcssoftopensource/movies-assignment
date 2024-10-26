"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { usePathname, useRouter } from "next/navigation";
import ImageUpload from "./common/ImageUpload";
import Image from "next/image";
import { X } from "lucide-react";
import { Movie } from "@/types/movies";
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "@/constant";

export const moviesformSchema = z.object({
  image: z.any().refine((file: any) => file?.length !== 0, 'File is required'),

  title: z.string().min(2, { message: "Title is required." }),
  date_of_publish: z.string().min(2, { message: "Date of pubish is required" }),
});

type MoviesformSchema = z.infer<typeof moviesformSchema>;

export default function UpsertMovieForm({ slug }: { slug: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [values, setValues] = useState<Movie>();

  const form = useForm<MoviesformSchema>({
    resolver: zodResolver(moviesformSchema),
    defaultValues: {
      image: "",
      title: "",
      date_of_publish: "",
    },
    values,
  });

  async function onSubmit(values: MoviesformSchema) {
    try {
      const formData = new FormData();

      formData.append("title", values.title);
      formData.append("date_of_publish", values.date_of_publish);

      formData.append("image", values.image);

      const url = isEditMode ? `/api/movie/${slug}` : "/api/movie";

      const response = await fetch(url, {
        method: isEditMode ? "PUT" : "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        toast.success(result.message);
        router.push("/movies");
        router.refresh();
      } else {
        toast.error(result.message);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(`Something went wrong.`);
    }
  }

  const isEditMode = !pathname.includes("/add");

  useEffect(() => {
    if (isEditMode && slug) {
      const fetchMovieById = async () => {
        try {
          const response = await fetch(`/api/movie/${slug}`, {
            method: "GET",
          });

          if (!response.ok) {
            throw new Error("Failed to fetch movie");
          }

          const data = await response.json();
          setValues(data.data);
          setUploadedImage(data.data.image);
        } catch (error) {
          console.error(error);
        }
      };

      fetchMovieById();
    }
  }, [isEditMode, slug]);

  const handleImageUpload = (imageFile: File) => {
    const imageUrl = URL.createObjectURL(imageFile);
    setUploadedImage(imageUrl);
    form.setValue("image", imageFile);
  };

  const _renderImageUpload = () => {
    return (
      <FormField
        control={form.control}
        name="image"
        render={() => (
          <FormItem>
            <FormControl>
              {uploadedImage ? (
                <div className="relative w-full  h-[300px]  md:h-[350px] lg:h-[400px] xl:h-[504px] ">
                  <Image
                    src={uploadedImage}
                    alt="Uploaded"
                    className=" w-full h-full rounded-md object-cover"
                    width={100}
                    height={100}
                  />
                  <X
                    size={30}
                    onClick={() => setUploadedImage(null)}
                    className="absolute -top-4 -right-4 p-2 text-black rounded-full bg-white"
                  />
                </div>
              ) : (
                <ImageUpload
                  form={form}
                  field={"image"}
                  onImageUpload={handleImageUpload}
                />
              )}
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  };

  return (
    <div>
      <h2 className="mb-7 md:mb-12  xl:mb-32 text-center w-full md:text-start  ">
        {isEditMode ? "Edit" : "Create a new movie"}
      </h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex sm:gap-[40px] md:gap-[90px] gap-[126px] flex-col md:flex-row  items-center md:items-start"
        >
          {/* Image Upload Section */}
          <section className=" w-1/2 h-full">{_renderImageUpload()}</section>

          {/* Fields Sections */}
          <section className="w-1/2 space-y-6 max-w-[362px]">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date_of_publish"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Publish Year"
                      {...field}
                      className="w-[216px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-4">
              <Button
                variant={"outline"}
                type="button"
                className="w-full border-white"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </div>
          </section>
        </form>
      </Form>
    </div>
  );
}
