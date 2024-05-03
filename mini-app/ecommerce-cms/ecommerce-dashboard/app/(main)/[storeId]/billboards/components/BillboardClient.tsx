"use client";

import { useParams, useRouter } from "next/navigation";

import { PlusIcon } from "lucide-react";

import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/dataTable";
import { ApiList } from "@/components/apiList";

import { BillboardTable, columns } from "./columns";

interface Props {
  billboards: BillboardTable[];
}

export const BillboardClient = ({ billboards }: Props) => {
  const total = billboards.length;

  const params = useParams();
  const router = useRouter();

  const onClickAddNew = () => {
    router.push(`/${params.storeId}/billboards/new-billboard`);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Billboards (${total})`}
          description="Manage billboards for your store"
        />
        <Button onClick={onClickAddNew}>
          <PlusIcon className="w-4 h-4 mr-2" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={billboards} searchKey="label" />
      <Heading title="API" description="API call for Billboards" />
      <Separator />
      <ApiList entityName="billboards" entityIdName="billboardId" />
    </>
  );
};