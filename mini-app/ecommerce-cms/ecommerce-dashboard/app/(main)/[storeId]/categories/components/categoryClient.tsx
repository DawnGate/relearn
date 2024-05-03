"use client";

import { useParams, useRouter } from "next/navigation";

import { PlusIcon } from "lucide-react";

import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/dataTable";
import { ApiList } from "@/components/apiList";

import { CategoryTable, columns } from "./columns";

interface Props {
  categories: CategoryTable[];
}

export const CategoryClient = ({ categories }: Props) => {
  const total = categories.length;

  const params = useParams();
  const router = useRouter();

  const onClickAddNew = () => {
    router.push(`/${params.storeId}/categories/new-category`);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Categories (${total})`}
          description="Manage categories for your store"
        />
        <Button onClick={onClickAddNew}>
          <PlusIcon className="w-4 h-4 mr-2" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={categories} searchKey="label" />
      <Heading title="API" description="API call for Categories" />
      <Separator />
      <ApiList entityName="categories" entityIdName="categoryId" />
    </>
  );
};
