import { CopyIcon, ServerIcon } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge, BadgeProps } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import toast from "react-hot-toast";

interface Props {
  title: string;
  description: string;
  variant: "public" | "admin";
}

const textMap: Record<Props["variant"], string> = {
  admin: "Admin",
  public: "Public",
};

const variantMap: Record<Props["variant"], BadgeProps["variant"]> = {
  admin: "destructive",
  public: "secondary",
};

export const ApiAlert = ({ title, description, variant = "public" }: Props) => {
  const onCopy = () => {
    navigator.clipboard.writeText(description);
    toast("Api route copied to clipboard!");
  };

  return (
    <Alert>
      <ServerIcon className="w-4 h-4" />
      <AlertTitle className="flex items-center gap-x-2">
        {title}
        <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
      </AlertTitle>
      <AlertDescription className="flex items-center justify-between gap-x-2">
        <code className="rounded bg-muted font-mono text-sm font-semibold px-[0.3rem] py-[0.2rem]">
          {description}
        </code>
        <Button size="icon" variant="outline" onClick={onCopy}>
          <CopyIcon className="w-4 h-4" />
        </Button>
      </AlertDescription>
    </Alert>
  );
};
