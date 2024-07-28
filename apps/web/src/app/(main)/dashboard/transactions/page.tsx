import axios from "axios";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CircleEllipsis } from "lucide-react";

async function getData() {
  const res = axios.get("http://localhost:8000/api/transaction");
  return res;
}

export default function DashboardTransactions() {
  const data = getData();
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Event</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Discount</TableHead>
            <TableHead>Voucher</TableHead>
            <TableHead>Price to Pay</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Summer Festivals</TableCell>
            <TableCell>120.000</TableCell>
            <TableCell>none</TableCell>
            <TableCell>10000</TableCell>
            <TableCell>110.000</TableCell>
            <TableCell>-</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <CircleEllipsis />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Confirm</DropdownMenuItem>
                  <DropdownMenuItem>Reject</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
