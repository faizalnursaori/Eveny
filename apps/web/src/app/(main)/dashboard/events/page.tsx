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

import { Button } from "@/components/ui/button";
import { EventProps } from "@/utils/types/types";
import { CircleEllipsis } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { deleteEvent } from "@/api/event";
import { DeleteEventDialog, EditEventDialog } from "@/components/DialogEvent";
import { Toaster } from "react-hot-toast";

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
      const userInfo = localStorage.getItem("userInfo");
      const user = JSON.parse(userInfo);
      const filteredEvent = data.events.filter(
        (event: { organizerId: number }) => {
          return event.organizerId === JSON.parse(user.id);
        },
      );

      setEvents(filteredEvent);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="h-screen">
      <Toaster/>
      <button className="btn btn-outline btn-accent">
        <Link href="/event-create">Create Event</Link>
      </button>
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
          {events.map((event) => {
            return (
              <TableRow key={event.id}>
                <TableCell>{event.title}</TableCell>
                <TableCell>{event.isFree ? 'Free' : `Rp ${event.price}`}</TableCell>
                <TableCell>{event.category}</TableCell>
                <TableCell>{event.location}</TableCell>
                <TableCell>{new Date(event.startDate).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(event.endDate).toLocaleDateString()}</TableCell>
                <TableCell>{event.availableSeat}</TableCell>
                <TableCell>
                  <details className="dropdown dropdown-left">
                    <summary className="btn m-1"><CircleEllipsis/></summary>
                    <ul className="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow">
                      <li>
                        <DeleteEventDialog id = {event.id}/>
                      </li>
                      <li>
                        <EditEventDialog id = {event.id} prevData = {event} />
                      </li>
                    </ul>
                  </details>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
