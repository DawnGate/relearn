import { ActionState, FieldErrors } from "@/lib/create-safe-action";
import { useState } from "react";

type Options<TOutput> = {
  onSuccess?: (data: TOutput) => void;
  onError?: (error: string) => void;
  onComplete?: () => void;
};

type Action<TInput, TOutput> = (
  data: TInput,
) => Promise<ActionState<TInput, TOutput>>;

interface UseActionProps<TInput, TOutput> {
  action: Action<TInput, TOutput>;
  options?: Options<TOutput>;
}

export const useAction = <TInput, TOutput>(
  action: Action<TInput, TOutput>,
  options: Options<TOutput>,
) => {
  const [data, setData] = useState<TOutput>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors<TInput>>({});

  const execute = async (data: TInput) => {
    try {
      const returnData = await action(data);

      if (returnData.error) {
        setError(returnData.error);
        options?.onError?.(returnData.error);
      }

      if (returnData.fieldErrors) {
        setFieldErrors(returnData.fieldErrors);
      }

      if (returnData.data) {
        setData(returnData.data);
        options?.onSuccess?.(returnData.data);
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
      options?.onComplete?.();
    }
  };

  // why use Callback in here

  return {
    execute,
    fieldErrors,
    data,
    error,
    isLoading,
  };
};
