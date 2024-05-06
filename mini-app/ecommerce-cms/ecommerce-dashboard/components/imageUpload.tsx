"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ImagePlusIcon, TrashIcon } from "lucide-react";

import { CldUploadWidget, CloudinaryUploadWidgetInfo } from "next-cloudinary";

import { Button } from "@/components/ui/button";

interface Props {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

export const ImageUpload = ({ disabled, onChange, onRemove, value }: Props) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return false;
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {value.map((imageUrl) => (
          <div
            key={imageUrl}
            className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
          >
            <div className="absolute z-10 top-2 right-2">
              <Button
                variant="destructive"
                onClick={() => {
                  onRemove(imageUrl);
                }}
                size="icon"
              >
                <TrashIcon className="w-4 h-4" />
              </Button>
            </div>
            <Image fill className="object-cover" src={imageUrl} alt="Image" />
          </div>
        ))}
      </div>
      <CldUploadWidget
        uploadPreset="ysfmsfmd"
        onSuccess={(results) => {
          if (results.info) {
            const info = results.info as CloudinaryUploadWidgetInfo;
            onChange(info.secure_url);
          }
        }}
      >
        {({ open }) => {
          return (
            <Button
              onClick={(e) => {
                e.preventDefault();
                open();
              }}
              disabled={disabled}
              size="sm"
              variant="secondary"
            >
              <ImagePlusIcon className="w-4 h-4 mr-2" />
              Upload Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};
