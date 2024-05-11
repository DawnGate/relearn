"use client";

import { useParams, useRouter } from "next/navigation";

import { Heading } from "@/components/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/dataTable";

import { OrderTable, columns } from "./columns";

interface Props {
  orders: OrderTable[];
}

export const OrderClient = ({ orders }: Props) => {
  const total = orders.length;

  const params = useParams();
  const router = useRouter();

  const onClickAddNew = () => {
    router.push(`/${params.storeId}/orders/new-order`);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Orders (${total})`}
          description="Manage orders for your store"
        />
      </div>
      <Separator />
      <DataTable columns={columns} data={orders} searchKey="label" />
    </>
  );
};
