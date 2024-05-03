"use client";

import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { useRouter } from "next/navigation";

import toast from "react-hot-toast";
import axios from "axios";

import { zodResolver } from "@hookform/resolvers/zod";

import { TrashIcon } from "lucide-react";

import { Store } from "@prisma/client";

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
import { ApiAlert } from "@/components/apiAlert";

import { useOrigin } from "@/hooks/use-origin";

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Store name must be at least 3 characters",
  }),
});

interface Props {
  initData: Store;
}

export const SettingsForm = ({ initData }: Props) => {
  const router = useRouter();

  const origin = useOrigin();

  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const storeId = initData.id;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initData.name,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      await axios.patch(`/api/stores/${storeId}`, values);

      toast.success("Store updated.");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/stores/${storeId}`);
      toast.success("Store deleted");
      router.push("/");
    } catch (error) {
      toast.error(
        "Something went wrong. Make sure you remove all products and categories with this store first"
      );
    } finally {
      setIsLoading(false);
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
        <Heading title="Settings" description="Manage store preferences" />
        <Button
          variant="destructive"
          size="icon"
          onClick={() => {
            setOpen(true);
          }}
        >
          <TrashIcon className="w-5 h-5" />
        </Button>
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
                      placeholder="Store name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
          </div>
          <div>
            <Button type="submit" disabled={isLoading}>
              Save changes
            </Button>
          </div>
        </form>
      </Form>
      <Separator />
      <ApiAlert
        title="NEXT_PUBLIC_API_URL"
        variant="public"
        description={`${origin}/api/stores/${storeId}`}
      />
    </>
  );
};
