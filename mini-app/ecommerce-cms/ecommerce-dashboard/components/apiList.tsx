"use client";

import { useOrigin } from "@/hooks/use-origin";
import { useParams } from "next/navigation";
import { ApiAlert } from "./apiAlert";

interface Props {
  entityName: string;
  entityIdName: string;
}

export const ApiList = ({ entityIdName, entityName }: Props) => {
  const params = useParams();
  const origin = useOrigin();

  const baseUrl = `${origin}/api/stores/${params.storeId}/${entityName}`;

  return (
    <>
      <ApiAlert title="GET" description={baseUrl} variant="public" />
      <ApiAlert
        title="GET"
        description={`${baseUrl}/${entityIdName}`}
        variant="public"
      />
      <ApiAlert title="POST" description={baseUrl} variant="admin" />
      <ApiAlert
        title="PATCH"
        description={`${baseUrl}/${entityIdName}`}
        variant="admin"
      />
      <ApiAlert
        title="DELETE"
        description={`${baseUrl}/${entityIdName}`}
        variant="admin"
      />
    </>
  );
};
