import { saveImage } from "@/helpers/save-image";
import dbConnect from "@/lib/db";
import Movie from "@/models/Movie";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    await dbConnect();

    const movieId = params.slug;

    const movie = await Movie.findById(movieId);

    if (!movie) {
      return NextResponse.json(
        {
          success: false,
          message: "Movie not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: movie, // Return the found movie
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "Error retrieving movie.",
        error: error.errors || error,
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    await dbConnect();
    const movieId = params.slug;

    // Use FormData to parse the incoming request
    const formData = await request.formData();

    const updatedData: any = {
      title: formData.get("title"),
      date_of_publish: formData.get("date_of_publish"),
    };

    // Handle image upload
    const image = formData.get("image") as File;
    let imagePath;

    if (image instanceof File) {
      imagePath = await saveImage(image);
      updatedData.image = imagePath;
    }

    const updatedMovie = await Movie.findByIdAndUpdate(movieId, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedMovie) {
      return NextResponse.json(
        {
          success: false,
          message: "Movie not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Movie update successfully!",
      data: updatedMovie,
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "Error updating movie.",
        error: error.errors || error,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    await dbConnect();

    const movieId = params.slug;

    const movie = await Movie.findByIdAndDelete(movieId);

    if (!movie) {
      return NextResponse.json(
        {
          success: false,
          message: "Movie not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Movie deleted successfully!",
      success: true,
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "Error retrieving movie.",
        error: error.errors || error,
      },
      { status: 500 }
    );
  }
}
