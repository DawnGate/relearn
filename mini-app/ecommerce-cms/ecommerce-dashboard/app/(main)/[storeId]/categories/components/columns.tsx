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
export type CategoryTable = {
  id: string;
  name: string;
  billboardLabel: string;
  createdAt: string;
};

const ActionCell = ({ data }: { data: CategoryTable }) => {
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

  const onDeleteCategory = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/stores/${storeId}/categories/${data.id}`);
      toast.success("Category deleted");
      router.refresh();
    } catch (error) {
      toast.error(
        "Something went wrong. Make sure you remove all products with this category first."
      );
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const onEdit = () => {
    router.push(`/${storeId}/categories/${data.id}`);
  };

  return (
    <div>
      <AlertModal
        isOpen={open}
        isLoading={loading}
        onClose={() => {
          setOpen(false);
        }}
        onConfirm={onDeleteCategory}
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

export const columns: ColumnDef<CategoryTable>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "billboardLabel",
    header: "Billboard",
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
