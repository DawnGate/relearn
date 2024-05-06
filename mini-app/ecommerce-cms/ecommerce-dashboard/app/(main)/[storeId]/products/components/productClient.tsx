"use client";

import { useParams, useRouter } from "next/navigation";

import { PlusIcon } from "lucide-react";

import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/dataTable";
import { ApiList } from "@/components/apiList";

import { ProductTable, columns } from "./columns";

interface Props {
  products: ProductTable[];
}

export const ProductClient = ({ products }: Props) => {
  const total = products.length;

  const params = useParams();
  const router = useRouter();

  const onClickAddNew = () => {
    router.push(`/${params.storeId}/products/new-product`);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Products (${total})`}
          description="Manage products for your store"
        />
        <Button onClick={onClickAddNew}>
          <PlusIcon className="w-4 h-4 mr-2" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={products} searchKey="label" />
      <Heading title="API" description="API call for Products" />
      <Separator />
      <ApiList entityName="products" entityIdName="productId" />
    </>
  );
};
