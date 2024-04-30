"use client";

import { useParams, useRouter } from "next/navigation";

import { PlusIcon } from "lucide-react";

import { Billboard } from "@prisma/client";

import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";

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
      <div>
        {billboards.map((billboard) => (
          <div key={billboard.id}>{billboard.id}</div>
        ))}
      </div>
    </>
  );
};
