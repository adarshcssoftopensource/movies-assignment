"use client";
import React, { useEffect, useState } from "react";

import MoviesCollectionHeader from "./MoviesCollectionHeader";
import MoviesCard from "./MoviesCard";
import { Movie } from "@/types/movies";
import Each from "./common/Each";
import EmptyList from "./EmptyList";
import { CustomPagination } from "./Pagination";
import LoadingCard from "./LoadingCard";

export default function MoviesCollection() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [totalMovies, setTotalMovies] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const limit = 2;

  const fetchMovies = async (page: number) => {
    setLoading(true);
    const response = await fetch(`/api/movie?page=${page}&limit=${limit}`);
    const data = await response.json();
    if (data.success) {
      setMovies(data.data);
      setTotalMovies(data.pagination.totalMovies);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(currentPage);
  }, [currentPage]);

  if (loading) return <LoadingCard />;
  if (!movies.length) return <EmptyList />;

  return (
    <div className="mt-7 md:mt-12  xl:mt-32">
      <section>
        <MoviesCollectionHeader />
      </section>
      <section className=" grid xl:grid-cols-4 lg:grid-cols-3  md:grid-cols-2 sm:grid-cols-1 gap-6">
        <Each
          of={movies ?? []}
          render={({
            _id: id,
            image,
            title,
            date_of_publish: dateOfPublish,
          }) => {
            return <MoviesCard {...{ id, image, title, dateOfPublish }} />;
          }}
        />
      </section>
      <section className="mt-7 md:mt-12  xl:mt-32">
        <CustomPagination
          totalMovies={totalMovies}
          limit={limit}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </section>
    </div>
  );
}
