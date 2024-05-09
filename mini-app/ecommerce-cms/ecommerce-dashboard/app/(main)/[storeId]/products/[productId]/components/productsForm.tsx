"use client";

import { z } from "zod";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";

import { useParams } from "next/navigation";

import toast from "react-hot-toast";
import axios from "axios";

import { zodResolver } from "@hookform/resolvers/zod";

import { TrashIcon } from "lucide-react";

import { Category, Color, Product, ProductImage, Size } from "@prisma/client";

import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AlertModal } from "@/components/alertModal";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import { ImageUpload } from "@/components/imageUpload";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Product name must be at least 3 characters",
  }),
  price: z.coerce.number().min(0.01, {
    message: "Product price must be at least 0.01$",
  }),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),

  categoryId: z.string().min(1),
  sizeId: z.string().min(1),
  colorId: z.string().min(1),

  images: z
    .object({
      url: z.string(),
    })
    .array()
    .min(1, {
      message: "At least 1 image for product",
    }),
});

interface Props {
  initData:
    | (Product & {
        images: ProductImage[];
      })
    | null;
  colors: Color[];
  sizes: Size[];
  categories: Category[];
}

export const ProductsForm = ({
  initData,
  categories,
  sizes,
  colors,
}: Props) => {
  const params = useParams();

  const { storeId } = params;

  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initData || {
      name: "",
      price: 0,

      images: [],

      isFeatured: false,
      isArchived: false,

      categoryId: "",
      sizeId: "",
      colorId: "",
    },
  });

  const title = initData ? "Edit product" : "Create product";
  const description = initData ? "Edit a product" : "Add a new product";
  const toastMessage = initData ? "Product updated" : "Product created";
  const action = initData ? "Save changes" : "Create new product";

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);

      if (initData) {
        await axios.patch(
          `/api/stores/${storeId}/products/${initData.id}`,
          values
        );
      } else {
        await axios.post(`/api/stores/${storeId}/products`, values);
      }
      window.location.assign(`/${storeId}/products`);
      toast.success(toastMessage);
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    if (!initData) return;
    try {
      setIsLoading(true);
      await axios.delete(`/api/stores/${storeId}/products/${initData.id}`);
      toast.success("Product deleted");
      window.location.assign(`/${storeId}/products`);
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isLoading={isLoading}
        isOpen={open}
        onClose={() => {
          setOpen(false);
        }}
        onConfirm={onDelete}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initData ? (
          <Button
            variant="destructive"
            size="icon"
            onClick={() => {
              setOpen(true);
            }}
          >
            <TrashIcon className="w-5 h-5" />
          </Button>
        ) : null}
      </div>
      <Separator />
      <Form {...form}>
        <form
          className="space-y-8 w-full"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Background image</FormLabel>
                  <FormControl>
                    <ImageUpload
                      disabled={isLoading}
                      value={field.value.map((item) => item.url)}
                      onChange={(url) => {
                        // Get problem by cloudinary
                        field.onChange([...field.value, { url }]);
                      }}
                      onRemove={(url) => {
                        field.onChange([
                          ...field.value.filter((item) => item.url !== url),
                        ]);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Product name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="9.99"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>

                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sizeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Size</FormLabel>

                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a size" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {sizes.map((size) => (
                        <SelectItem key={size.id} value={size.id}>
                          {size.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="colorId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>

                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a color" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {colors.map((color) => (
                        <SelectItem key={color.id} value={color.id}>
                          {color.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isFeatured"
              render={({ field }) => {
                return (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Featured</FormLabel>
                      <FormDescription>
                        This product will appear on the home page
                      </FormDescription>
                    </div>
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="isArchived"
              render={({ field }) => {
                return (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Archived</FormLabel>
                      <FormDescription>
                        This product will not appear anywhere in the store.
                      </FormDescription>
                    </div>
                  </FormItem>
                );
              }}
            />
          </div>
          <div>
            <Button type="submit" disabled={isLoading}>
              {action}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
