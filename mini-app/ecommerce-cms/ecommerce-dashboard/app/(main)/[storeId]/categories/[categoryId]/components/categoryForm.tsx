"use client";

import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { useParams, useRouter } from "next/navigation";

import toast from "react-hot-toast";
import axios from "axios";

import { zodResolver } from "@hookform/resolvers/zod";

import { TrashIcon } from "lucide-react";

import { Billboard, Category } from "@prisma/client";

import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AlertModal } from "@/components/alertModal";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Category name must be at least 3 characters",
  }),
  billboardId: z.string(),
});

interface Props {
  initData: Category | null;
  billboards: Billboard[];
}

export const CategoryForm = ({ initData, billboards }: Props) => {
  const router = useRouter();
  const params = useParams();

  const { storeId } = params;

  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initData || {
      name: "",
      billboardId: "",
    },
  });

  const title = initData ? "Edit category" : "Create category";
  const description = initData ? "Edit a category" : "Add a new category";
  const toastMessage = initData ? "Category updated" : "Category created";
  const action = initData ? "Save changes" : "Create new category";

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);

      if (initData) {
        await axios.patch(
          `/api/stores/${storeId}/categories/${initData.id}`,
          values
        );
        toast.success(toastMessage);
        router.refresh();
      } else {
        const res = await axios.post(
          `/api/stores/${storeId}/categories`,
          values
        );

        if (res) {
          toast.success(toastMessage);
          router.push(`/${storeId}/categories/${res.data.id}`);
        }
      }
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
      await axios.delete(`/api/stores/${storeId}/categories/${initData.id}`);
      toast.success("Category deleted");
      window.location.assign(`/${storeId}/categories`);
    } catch (error) {
      toast.error(
        "Something went wrong. Make sure you remove all products with this category first."
      );
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
                      placeholder="Category name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="billboardId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Billboard</FormLabel>

                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a billboard" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {billboards.map((billboard) => (
                        <SelectItem key={billboard.id} value={billboard.id}>
                          {billboard.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
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
