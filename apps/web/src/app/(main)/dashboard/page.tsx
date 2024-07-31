"use client";

import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { DateRangePicker } from "@/components/DateRangePicker";
import { EventProps } from "@/utils/types/types";


export default function page() {
  const [events, setEvents] = useState<EventProps[]>([]);
  const [transactions, setTransactions] = useState<any>([]);

  useEffect(() => {
    getEvents();
    getTransactions()
  }, []);

  async function getEvents() {
    try {
      const response = await fetch("http://localhost:8000/api/events", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const userInfo = localStorage.getItem("userInfo");
      const user = JSON.parse(userInfo!);
      const filteredEvent = data.events.filter(
        (event: { organizerId: number }) => {
          return event.organizerId === JSON.parse(user.id);
        },
      );
      
      const reversedEvent = filteredEvent.reverse()
      setEvents(reversedEvent);
    } catch (error) {
      console.log(error);
    }
  }

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
      const reversedTransaction = filteredTransaction.reverse()
      setTransactions(reversedTransaction);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="grid h-[100vh] grid-cols-1 gap-5 md:grid-cols-2">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Total Revenue</CardTitle>
          <DateRangePicker />
        </CardHeader>
        <CardContent>
          <div>Asal</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Transaction</CardTitle>
          <DateRangePicker />
        </CardHeader>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Transaction</CardTitle>
            <CardDescription>Recent transaction</CardDescription>
          </div>
          <button className="btn btn-outline">
            <Link href="/dashboard/transactions">View All</Link>
          </button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer Name</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
            {transactions.map((item: {finalPrice: number, status: string, id: number, user:{name: string} }, index:number) => {
                if (index < 5) {
                  return (
                    <TableRow key={item.id}>
                      <TableCell>{item.user.name}</TableCell>
                      <TableCell>{item.finalPrice}</TableCell>
                      <TableCell>{item.status}</TableCell>
                    </TableRow>
                  );
                }
              })}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
      <Card>
        <CardHeader className="flex flex-row justify-between">
          <div>
            <CardTitle>Events</CardTitle>
            <CardDescription>Recent events</CardDescription>
          </div>
          <button className="btn btn-outline">
            <Link href="/dashboard/events">View All</Link>
          </button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event Title</TableHead>
                <TableHead>Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.map((event, index) => {
                if (index < 5) {
                  return (
                    <TableRow key={event.id}>
                      <TableCell>{event.title}</TableCell>
                      <TableCell>{event.price}</TableCell>
                    </TableRow>
                  );
                }
              })}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
}
