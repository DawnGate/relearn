"use client";

import { format } from "date-fns";

import { useParams, useRouter } from "next/navigation";

import { PlusIcon } from "lucide-react";

import { Billboard } from "@prisma/client";

import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/dataTable";

import { BillboardTable, columns } from "./columns";
import { ApiList } from "@/components/apiList";

interface Props {
  billboards: Billboard[];
}

export const BillboardClient = ({ billboards }: Props) => {
  const total = billboards.length;

  const params = useParams();
  const router = useRouter();

  const onClickAddNew = () => {
    router.push(`/${params.storeId}/billboards/new-billboard`);
  };

  const formattedData: BillboardTable[] = billboards.map((billboard) => ({
    label: billboard.label,
    createdAt: format(billboard.createdAt, "MMMM do, yyyy"),
    id: billboard.id,
  }));

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
      <DataTable columns={columns} data={formattedData} searchKey="label" />
      <Heading title="API" description="API call for Billboards" />
      <Separator />
      <ApiList entityName="billboards" entityIdName="billboardId" />
    </>
  );
};
