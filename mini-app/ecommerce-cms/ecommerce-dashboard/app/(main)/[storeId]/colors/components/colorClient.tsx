"use client";

import { useParams, useRouter } from "next/navigation";

import { PlusIcon } from "lucide-react";

import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/dataTable";
import { ApiList } from "@/components/apiList";

import { ColorTable, columns } from "./columns";

interface Props {
  colors: ColorTable[];
}

export const ColorClient = ({ colors }: Props) => {
  const total = colors.length;

  const params = useParams();
  const router = useRouter();

  const onClickAddNew = () => {
    router.push(`/${params.storeId}/colors/new-color`);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Colors (${total})`}
          description="Manage colors for your store"
        />
        <Button onClick={onClickAddNew}>
          <PlusIcon className="w-4 h-4 mr-2" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={colors} searchKey="label" />
      <Heading title="API" description="API call for Colors" />
      <Separator />
      <ApiList entityName="colors" entityIdName="colorId" />
    </>
  );
};
