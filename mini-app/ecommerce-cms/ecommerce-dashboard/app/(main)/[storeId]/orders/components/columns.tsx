"use client";

import { useParams, useRouter } from "next/navigation";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type OrderTable = {
  id: string;
  isPaid: string;
  phone: string;
  address: string;
  totalPrice: string;
  createdAt: string;
  products: string;
};

export const columns: ColumnDef<OrderTable>[] = [
  {
    accessorKey: "products",
    header: "Products",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "totalPrice",
    header: "Total Prices",
  },
  {
    accessorKey: "isPaid",
    header: "isPaid",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
];
