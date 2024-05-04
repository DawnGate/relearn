"use client";

import { useParams, useRouter } from "next/navigation";

import { PlusIcon } from "lucide-react";

import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/dataTable";
import { ApiList } from "@/components/apiList";

import { SizeTable, columns } from "./columns";

interface Props {
  sizes: SizeTable[];
}

export const SizeClient = ({ sizes }: Props) => {
  const total = sizes.length;

  const params = useParams();
  const router = useRouter();

  const onClickAddNew = () => {
    router.push(`/${params.storeId}/sizes/new-size`);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Sizes (${total})`}
          description="Manage sizes for your store"
        />
        <Button onClick={onClickAddNew}>
          <PlusIcon className="w-4 h-4 mr-2" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={sizes} searchKey="label" />
      <Heading title="API" description="API call for Sizes" />
      <Separator />
      <ApiList entityName="sizes" entityIdName="sizeId" />
    </>
  );
};
