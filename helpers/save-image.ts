import { promises as fs } from "fs";
import path from "path";

// Helper function to save the uploaded image to a temporary directory
export async function saveImage(file: File): Promise<string> {
  // Use the /tmp directory for uploads
  const uploadDir = path.join("/tmp");

  // Ensure the upload directory exists
  await fs.mkdir(uploadDir, { recursive: true });

  // Define a unique filename with the original extension
  const filename = `${Date.now()}-${file.name}`;
  console.log(filename);

  const filePath = path.join(uploadDir, filename);

  // Write the file to disk
  const arrayBuffer = await file.arrayBuffer();
  await fs.writeFile(filePath, Buffer.from(arrayBuffer));

  // Return the file path (note this is temporary and should be handled accordingly)
  return `/tmp/${filename}`; // You may want to adjust this based on your storage solution
}
