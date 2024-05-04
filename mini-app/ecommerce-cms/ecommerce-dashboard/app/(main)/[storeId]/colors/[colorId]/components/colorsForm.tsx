"use client";

import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { useParams, useRouter } from "next/navigation";

import toast from "react-hot-toast";
import axios from "axios";

import { zodResolver } from "@hookform/resolvers/zod";

import { TrashIcon } from "lucide-react";

import { Color } from "@prisma/client";

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
    message: "Color label must be at least 3 characters",
  }),
  value: z
    .string()
    .min(4)
    .regex(/^#(\d|\w)+/, "Value must be a valid hex color"),
});

interface Props {
  initData: Color | null;
}

export const ColorsForm = ({ initData }: Props) => {
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

  const title = initData ? "Edit color" : "Create color";
  const description = initData ? "Edit a color" : "Add a new color";
  const toastMessage = initData ? "Color updated" : "Color created";
  const action = initData ? "Save changes" : "Create new color";

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);

      if (initData) {
        await axios.patch(
          `/api/stores/${storeId}/colors/${initData.id}`,
          values
        );
      } else {
        await axios.post(`/api/stores/${storeId}/colors`, values);
      }
      toast.success(toastMessage);
      window.location.assign(`/${storeId}/colors`);
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
      await axios.delete(`/api/stores/${storeId}/colors/${initData.id}`);
      toast.success("Color deleted");
      window.location.assign(`/${storeId}/colors`);
    } catch (error) {
      toast.error(
        "Something went wrong. Make sure you remove all products with this color first."
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
            color="icon"
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
                      placeholder="Color label"
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
                    <div className="flex items-center gap-x-2">
                      <Input
                        disabled={isLoading}
                        placeholder="Color value"
                        {...field}
                      />
                      <div
                        className="w-10 h-10 rounded-full border shrink-0"
                        style={{
                          backgroundColor: field.value,
                        }}
                      ></div>
                    </div>
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
