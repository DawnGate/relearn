"use client";

import { useParams, useRouter } from "next/navigation";

import toast from "react-hot-toast";

import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { CopyIcon, EditIcon, MoreHorizontal, TrashIcon } from "lucide-react";
import { AlertModal } from "@/components/alertModal";
import { useState } from "react";
import axios from "axios";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ProductTable = {
  id: string;
  name: string;
  price: string;
  isFeatured: boolean;
  isArchived: boolean;
  color: string;
  size: string;
  category: string;
  createdAt: string;
};

const ActionCell = ({ data }: { data: ProductTable }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const params = useParams();

  const { storeId } = params;

  const onCopy = () => {
    navigator.clipboard.writeText(data.id);
    toast.success("Copy Id success");
  };

  const onDelete = () => {
    setOpen(true);
  };

  const onDeleteProduct = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/stores/${storeId}/products/${data.id}`);
      toast.success("Product deleted");
      router.refresh();
    } catch (error) {
      toast.error(
        "Something went wrong. Make sure you remove all categories with this product first."
      );
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const onEdit = () => {
    router.push(`/${storeId}/products/${data.id}`);
  };

  return (
    <div>
      <AlertModal
        isOpen={open}
        isLoading={loading}
        onClose={() => {
          setOpen(false);
        }}
        onConfirm={onDeleteProduct}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={onCopy}>
            <CopyIcon className="mr-2 w-4 h-4" />
            Copy Id
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onEdit}>
            <EditIcon className="mr-2 w-4 h-4" />
            Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onDelete}>
            <TrashIcon className="mr-2 w-4 h-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export const columns: ColumnDef<ProductTable>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "isFeatured",
    header: "IsFeatured",
  },
  {
    accessorKey: "isArchived",
    header: "IsArchived",
  },
  {
    accessorKey: "size",
    header: "Size",
  },
  {
    accessorKey: "color",
    header: "Color",
    cell: ({ row }) => {
      const original = row.original;

      return (
        <div className="flex items-center gap-x-2">
          <div>{original.color}</div>
          <div
            className="w-6 h-6 rounded-full border"
            style={{
              backgroundColor: original.color,
            }}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => <ActionCell data={row.original} />,
  },
];
