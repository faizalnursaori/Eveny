'use client'
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
import { useEffect,useState } from "react";
import { getTransaction } from "@/api/transaction";



export default function DashboardTransactions() {
  const [transactions, setTransactions] = useState({})

  useEffect(()=>{
    const res = getTransaction()
    setTransactions(res)
  },[transactions])

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Event</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Discount</TableHead>
            <TableHead>Point Used</TableHead>
            <TableHead>Price to Pay</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) =>{
            <TableRow key={transaction.id}>
              <TableCell>{transaction.eventId}</TableCell>
              <TableCell>{transaction.totalPrice}</TableCell>
              <TableCell>{transaction.discount}</TableCell>
              <TableCell>{transaction.pointUsed}</TableCell>
              <TableCell>{transaction.transactionDate}</TableCell>
              <TableCell>{transaction.status}</TableCell>
              
            </TableRow>
          })}
        </TableBody>
      </Table>
    </div>
  );
}
