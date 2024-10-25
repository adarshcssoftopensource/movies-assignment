import { NextRequest, NextResponse } from "next/server";
import Movie from "@/models/Movie";
import dbConnect from "@/lib/db";
import { saveImage } from "@/helpers/save-image";
import { revalidatePath } from "next/cache";

export async function POST(
  request: NextRequest,
  { params }: { params: { tags: string } }
) {
  try {
    await dbConnect();

    const formData = await request.formData();

    const image = formData.get("image") as File;
    const title = formData.get("title") as string;
    const date_of_publish = formData.get("date_of_publish") as string;

    const imagePath = await saveImage(image);

    const newMovie = new Movie({
      image: imagePath,
      title,
      date_of_publish,
    });
    await newMovie.save();
    revalidatePath("/movies");

    return NextResponse.json({
      success: true,
      revalidated: true,
      message: "Movie saved successfully!",
    });
  } catch (error: any) {
    console.error(error);
    // Return a 400 status code for validation errors
    return NextResponse.json(
      {
        success: false,
        message: "Error saving movie.",
        error: error.errors || error,
      },
      { status: 400 }
    );
  }
}

export async function GET(request: Request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);

    const skip = (page - 1) * limit;

    const movies = await Movie.find({}).skip(skip).limit(limit);

    const totalMovies = await Movie.countDocuments();

    return NextResponse.json({
      success: true,
      data: movies,
      pagination: {
        totalMovies,
        totalPages: Math.ceil(totalMovies / limit),
        currentPage: page,
        limit,
      },
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "Error retrieving movies.",
        error: error.errors || error,
      },
      { status: 500 }
    );
  }
}
