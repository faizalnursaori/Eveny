"use client";
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

import { Button } from "@/components/ui/button";
import { EventProps } from "@/utils/types/types";
import { CircleEllipsis } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function DashboardEvents() {
  const [events, setEvents] = useState<EventProps[]>([]);

  useEffect(() => {
    getEvents();
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
      setEvents(data.events);
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div>
      <button className="btn btn-outline btn-accent">Create Event</button>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Event Title</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Event Start</TableHead>
            <TableHead>Event End</TableHead>
            <TableHead>Available Seats</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Summer Festivals</TableCell>
            <TableCell>120.000</TableCell>
            <TableCell>Festivals</TableCell>
            <TableCell>Jakarta</TableCell>
            <TableCell>-</TableCell>
            <TableCell>-</TableCell>
            <TableCell>10</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger><CircleEllipsis /></DropdownMenuTrigger>
                <DropdownMenuContent>
                <DropdownMenuLabel>
                  Actions
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
