import { z } from "zod";

export type FieldErrors<T> = {
  [K in keyof T]?: string[];
};

export type ActionState<TInput, TOutput> = {
  error?: string;
  fieldErrors?: FieldErrors<TInput>;
  data?: TOutput;
};

type HandlerType<TInput, TOutput> = (
  validatedData: TInput,
) => Promise<ActionState<TInput, TOutput>>;

export const createSafeAction = <TInput, TOutput>(
  scheme: z.Schema<TInput>,
  handler: HandlerType<TInput, TOutput>,
) => {
  const action = async (inputData: TInput) => {
    const validateData = scheme.safeParse(inputData);

    if (!validateData.success) {
      return {
        fieldErrors: validateData.error.flatten().fieldErrors,
      };
    }

    return handler(validateData.data);
  };

  return action;
};
