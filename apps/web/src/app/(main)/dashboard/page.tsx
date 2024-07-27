"use client";

import Link from "next/link";
import axios from "axios";
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

export default function page() {
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
          <Button variant="outline"><Link href='/dashboard/transactions'>View All</Link></Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead >Customer Name</TableHead>
                <TableHead >Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Joko</TableCell>
                <TableCell>150.000</TableCell>
              </TableRow>
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
          <Button variant="outline"><Link href='/dashboard/events'>View All</Link></Button>
        </CardHeader>
        <CardContent>
        <Table>
            <TableHeader>
              <TableRow>
                <TableHead >Event Title</TableHead>
                <TableHead >Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Summer Festivals</TableCell>
                <TableCell>250.000</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
}
