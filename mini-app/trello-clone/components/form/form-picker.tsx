"use client";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";

import Image from "next/image";
import Link from "next/link";

import { Check, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

import { unsplash } from "@/lib/unsplash";

import { imageUnsplash as defaultImages } from "@/constants/image_unsplash";
import { FormError } from "./form-error";

interface FormPickerProps {
  id: string;
  errors?: Record<string, string[] | undefined>;
}

export const FormPicker = ({ id, errors }: FormPickerProps) => {
  const [isLoading, setIsLoading] = useState(true);

  const [images, setImages] =
    useState<Array<Record<string, any>>>(defaultImages);

  const [selectedImageId, setSelectedImageId] = useState<string>();

  const { pending } = useFormStatus();

  useEffect(() => {
    const loadImages = async () => {
      try {
        const res = await unsplash.photos.getRandom({
          collectionIds: ["317099"],
          count: 9,
        });

        if (res && res.response) {
          setImages(res.response as Array<Record<string, any>>);
        } else {
          console.log("fail to get images from unsplash");
        }
      } catch (err) {
        setImages(defaultImages);
      } finally {
        setIsLoading(false);
      }
    };

    loadImages();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-6">
        <Loader2 className="h-6 w-6 animate-spin text-sky-600" />
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="mb-2 grid grid-cols-3 gap-2">
        {images.map((image) => (
          <div
            key={image.id}
            className={cn(
              "group relative aspect-video cursor-pointer bg-muted transition hover:opacity-75",
              pending && "cursor-auto opacity-50 hover:opacity-50",
            )}
            onClick={() => {
              if (pending) return;
              setSelectedImageId(image.id);
            }}
          >
            <input
              id={id}
              name={id}
              type="radio"
              checked={image.id === selectedImageId}
              onChange={() => {}}
              disabled={pending}
              className="hidden"
              value={`${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}`}
            />
            <Image
              src={image.urls.thumb}
              alt="Unsplash Image"
              className="rounded-sm object-cover"
              fill
              sizes="100%"
            />
            {selectedImageId === image.id && (
              <div className="absolute inset-0 flex h-full w-full items-center justify-center bg-black/30">
                <Check className="h-4 w-4 text-white" />
              </div>
            )}
            <Link
              href={image.links.html}
              target="_blank"
              className="absolute bottom-0 w-full truncate bg-black/50 p-1 text-[10px] text-white opacity-0 hover:underline group-hover:opacity-100"
            >
              {image.user.name}
            </Link>
          </div>
        ))}
      </div>
      <FormError errors={errors} id={id} />
    </div>
  );
};
