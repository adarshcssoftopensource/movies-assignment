import { promises as fs } from "fs";
import path from "path";

// Helper function to save the uploaded image to the 'upload' folder
export async function saveImage(file: File): Promise<string> {
  const uploadDir = '/tmp'

  // Ensure the upload directory exists
  await fs.mkdir(uploadDir, { recursive: true });

  // Define a unique filename with the original extension
  const filename = `${Date.now()}-${file.name}`;
  console.log(filename);

  const filePath = path.join(uploadDir, filename);

  // Write the file to disk
  const arrayBuffer = await file.arrayBuffer();
  await fs.writeFile(filePath, Buffer.from(arrayBuffer));

  return `/uploads/${filename}`; // Return the relative path to save in the database
}
