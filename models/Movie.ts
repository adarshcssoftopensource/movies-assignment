// models/Movie.ts
import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema({
  image: { type: String, required: true },
  title: { type: String, required: true },
  date_of_publish: { type: String, required: true },
});

export default mongoose.models.Movie || mongoose.model("Movie", MovieSchema);
