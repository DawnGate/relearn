"use client";

import { useAction } from "@/hooks/use-action";

import { createBoard } from "@/actions/createBoard";
import { FormInput } from "@/components/form/form-input";
import { FormSubmit } from "@/components/form/form-submit";

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
    console.log(title);
    execute({ title });
  };

  return (
    <form action={onSubmit}>
      <FormInput id="title" label="Board title" errors={fieldErrors} />
      <FormSubmit>Save</FormSubmit>
    </form>
  );
};
