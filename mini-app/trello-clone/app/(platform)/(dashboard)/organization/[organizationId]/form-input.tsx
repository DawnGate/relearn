import { useFormStatus } from "react-dom";

interface FormInputProps {
  errors?: {
    title?: string[];
  };
}

export const FormInput = ({ errors }: FormInputProps) => {
  const { pending } = useFormStatus();

  return (
    <div className="flex flex-col space-y-2">
      <input
        type="text"
        id="title"
        name="title"
        required
        className="border border-black p-1"
        disabled={pending}
      />
      {errors?.title && (
        <div>
          {errors.title.map((err: string) => (
            <p key={err} className="text-rose-500">
              {err}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};
