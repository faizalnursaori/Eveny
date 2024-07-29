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
            <TableHead>Voucher</TableHead>
            <TableHead>Price to Pay</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          
        </TableBody>
      </Table>
    </div>
  );
}
