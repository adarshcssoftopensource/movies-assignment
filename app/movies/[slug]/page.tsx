import UpsertMovieForm from "@/components/UpsertMovieForm";
import React from "react";

export default function page({ params }: { params: { slug: string } }) {
  return (
    <div className=" mt-7 md:mt-12  xl:mt-32">
      <UpsertMovieForm slug={params.slug} />
    </div>
  );
}
