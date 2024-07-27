"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string
  customerName : string
  event: string
  price: number
  points: number
  voucher: string
  status: "pending" | "completed" | "failed"
  date: Date

}

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "",
    header: "",
  },
  {
    accessorKey: "event",
    header: "event",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "points",
    header: "Redeemed Points",
  },
  {
    accessorKey: "voucher",
    header: "Voucher",
  },
  {
    accessorKey: "status",
    header: "Payment Status",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
]
