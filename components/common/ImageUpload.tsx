"use client";

import { Upload } from "lucide-react";
import { memo } from "react";
import { FileUploader } from "react-drag-drop-files";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";

import { Card, CardDescription, CardTitle } from "../ui/card";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE } from "@/constant";

interface ImageUploadProps {
  form?: UseFormReturn<any>;
  field?: string;
  onImageUpload: (imageFile: File) => void;
}

const ImageUpload = ({ form, field = "", onImageUpload }: ImageUploadProps) => {
  const handleTypeError = () => {
    form?.setError(field, {
      type: "custom",
      message: "Only .jpg, .jpeg and .png formats are supported.",
    });
  };

  const handleSizeError = () => {
    form?.setError(field, {
      type: "custom",
      message: "Max image size is 500KB..",
    });
  };

  return (
    <div className="relative w-full">
      <FileUploader
        handleChange={onImageUpload}
        maxSize={MAX_FILE_SIZE}
        name="file"
        types={ALLOWED_FILE_TYPES}
        onDrop={onImageUpload}
        onSizeError={handleSizeError}
        onTypeError={handleTypeError}
        children={
          <Card
            className="bg-input border-dashed h-[300px]  md:h-[350px] lg:h-[400px] xl:h-[504px] flex flex-col justify-center items-center border border-white text-white"
            onClick={(ev) => ev.preventDefault()}
          >
            <CardTitle className="mb-2">
              <Upload />
            </CardTitle>
            <CardDescription className="text-white">
              Drop an image here
            </CardDescription>
          </Card>
        }
      />
    </div>
  );
};

export default ImageUpload;
