'use client'
import { useState, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
import { event } from "cypress/types/jquery";
import Link from "next/link";



export default function Events(){
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
          (transaction: { userId: number, status: string }) => {
            return transaction.userId === JSON.parse(user.id) && transaction.status === 'completed';
          },
        );
        
  
        setTransactions(filteredTransaction);
      } catch (error) {
        console.log(error);
      }
  };


    return(
        <Table>
            <TableHeader>
          <TableRow>
            <TableHead>Event Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Event Start</TableHead>
            <TableHead>Event End</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
            {transactions.map((item: {id:number,event: {title:string, category: string, location: string, startDate: string, endDate: string, slug: string}}) =>{
                return <TableRow key={item.id}>
                    <TableCell><Link href = {`/events/${item.event.slug}`}>{item.event.title}</Link></TableCell>
                    <TableCell>{item.event.category}</TableCell>
                    <TableCell>{item.event.location}</TableCell>
                    <TableCell>{new Date(item.event.startDate).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(item.event.endDate).toLocaleDateString()}</TableCell>
                </TableRow>
            })}
        </TableBody>
        <TableBody>

        </TableBody>
        </Table>
    )
}