"use client";

import { createBoard } from "@/actions/createBoard";
import { Button } from "@/components/ui/button";
import { useFormState } from "react-dom";
import { FormInput } from "./form-input";
import { FormButton } from "./form-button";

export const Form = () => {
  const initState = {
    errors: {},
    message: "",
  };
  const [state, dispatch] = useFormState(createBoard, initState);

  return (
    <form action={dispatch}>
      <FormInput errors={state?.errors} />
      <FormButton />
    </form>
  );
};
