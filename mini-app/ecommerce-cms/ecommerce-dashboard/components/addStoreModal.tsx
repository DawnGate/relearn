"use client";

import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";

import { zodResolver } from "@hookform/resolvers/zod";

import { useModal } from "@/hooks/use-modal";
import { Modal } from "@/components/modal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Store name must be at least 3 characters",
  }),
});

export const AddStoreForm = () => {
  const storeModal = useModal();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/stores", values);
      toast.success("Add new store");
    } catch (error) {
      toast.error("Something wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Create Store"
      description="Add a new store to manage products and categories"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 py-2 pb-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder="E-Commerce"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="pt-6 space-x-2 flex items-center justify-end">
            <Button variant="outline" onClick={storeModal.onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              Continue
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};
