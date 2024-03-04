"use client";

import { FormInput } from "./form-input";
import { FormButton } from "./form-button";
import { useAction } from "@/hooks/use-action";

import { createBoard } from "@/actions/createBoard";

export const Form = () => {
  const { fieldErrors, execute } = useAction(createBoard, {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    execute({ title });
  };

  return (
    <form action={onSubmit}>
      <FormInput errors={fieldErrors} />
      <FormButton />
    </form>
  );
};
