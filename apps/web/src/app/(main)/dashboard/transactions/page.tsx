"use client";
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
import { useEffect, useState } from "react";
import { CompleteDialog, RejectDialog } from "@/components/ConfirmDialog";

export default function DashboardTransactions() {
  const [transactions, setTransactions] = useState<any>([]);

  useEffect(() => {
    getTransactions();
  }, []);

  const getTransactions = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/transactions", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);
      const userInfo = localStorage.getItem("userInfo");
      const user = JSON.parse(userInfo!);
      const filteredTransaction = data.filter(
        (transaction: { event: { organizerId: number } }) => {
          return transaction.event.organizerId === JSON.parse(user.id);
        },
      );
      console.log(filteredTransaction);

      setTransactions(filteredTransaction);
    } catch (error) {
      console.log(error);
    }
  };

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
          {transactions.map(
            (item: {
              id: number;
              event: { title: string };
              totalPrice: number;
              discount: number;
              pointUsed: number;
              transactionDate: string;
              status: string;
              finalPrice: number;
            }) => {
              return (
                <TableRow key={item.id}>
                  <TableCell>{item.event.title}</TableCell>
                  <TableCell>{item.totalPrice}</TableCell>
                  <TableCell>{item.discount}</TableCell>
                  <TableCell>{item.pointUsed}</TableCell>
                  <TableCell>{item.finalPrice}</TableCell>
                  <TableCell>
                    {new Date(item.transactionDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{item.status}</TableCell>
                  <TableCell>
                    <details className="dropdown dropdown-left">
                      <summary className="btn m-1">
                        <CircleEllipsis />
                      </summary>
                      <ul className="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow">
                        <li>
                          <CompleteDialog id ={item.id}/>
                        </li>
                        <li>
                          <RejectDialog id = {item.id}/>
                        </li>
                      </ul>
                    </details>
                  </TableCell>
                </TableRow>
              );
            },
          )}
        </TableBody>
      </Table>
    </div>
  );
}
