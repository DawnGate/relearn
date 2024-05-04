"use client";

import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { useParams, useRouter } from "next/navigation";

import toast from "react-hot-toast";
import axios from "axios";

import { zodResolver } from "@hookform/resolvers/zod";

import { TrashIcon } from "lucide-react";

import { Billboard } from "@prisma/client";

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

import { ImageUpload } from "@/components/imageUpload";

const formSchema = z.object({
  label: z.string().min(3, {
    message: "Billboard label must be at least 3 characters",
  }),
  imageUrl: z.string().min(1),
});

interface Props {
  initData: Billboard | null;
}

export const BillboardsForm = ({ initData }: Props) => {
  const router = useRouter();
  const params = useParams();

  const { storeId } = params;

  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initData || {
      label: "",
      imageUrl: "",
    },
  });

  const title = initData ? "Edit billboard" : "Create billboard";
  const description = initData ? "Edit a billboard" : "Add a new billboard";
  const toastMessage = initData ? "Billboard updated" : "Billboard created";
  const action = initData ? "Save changes" : "Create new billboard";

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);

      if (initData) {
        await axios.patch(
          `/api/stores/${storeId}/billboards/${initData.id}`,
          values
        );
      } else {
        await axios.post(`/api/stores/${storeId}/billboards`, values);
      }
      window.location.assign(`/${storeId}/billboards`);
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
      await axios.delete(`/api/stores/${storeId}/billboards/${initData.id}`);
      toast.success("Billboard deleted");
      window.location.assign(`/${storeId}/billboards`);
    } catch (error) {
      toast.error(
        "Something went wrong. Make sure you remove all categories with this billboard first."
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
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Background image</FormLabel>
                <FormControl>
                  <ImageUpload
                    disabled={isLoading}
                    value={field.value ? [field.value] : []}
                    onChange={(url) => {
                      field.onChange(url);
                    }}
                    onRemove={() => {
                      field.onChange("");
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Billboard label"
                      {...field}
                    />
                  </FormControl>
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
