"use client";

import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { useParams, useRouter } from "next/navigation";

import toast from "react-hot-toast";
import axios from "axios";

import { zodResolver } from "@hookform/resolvers/zod";

import { TrashIcon } from "lucide-react";

import { Size } from "@prisma/client";

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

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Size label must be at least 3 characters",
  }),
  value: z.string().min(1),
});

interface Props {
  initData: Size | null;
}

export const SizesForm = ({ initData }: Props) => {
  const router = useRouter();
  const params = useParams();

  const { storeId } = params;

  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initData || {
      name: "",
      value: "",
    },
  });

  const title = initData ? "Edit size" : "Create size";
  const description = initData ? "Edit a size" : "Add a new size";
  const toastMessage = initData ? "Size updated" : "Size created";
  const action = initData ? "Save changes" : "Create new size";

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);

      if (initData) {
        await axios.patch(
          `/api/stores/${storeId}/sizes/${initData.id}`,
          values
        );
      } else {
        await axios.post(`/api/stores/${storeId}/sizes`, values);
      }
      toast.success(toastMessage);
      window.location.assign(`/${storeId}/sizes`);
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
      await axios.delete(`/api/stores/${storeId}/sizes/${initData.id}`);
      toast.success("Size deleted");
      window.location.assign(`/${storeId}/sizes`);
    } catch (error) {
      toast.error(
        "Something went wrong. Make sure you remove all products with this size first."
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
                      placeholder="Size label"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Size value"
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
