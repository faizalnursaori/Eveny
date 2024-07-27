"use client";

import React, { useState, useEffect } from "react";
import EventCard from "@/components/EventCard";
import { EventProps } from "@/utils/types/types";
import { Loader2 } from "lucide-react";

export default function Events() {
  const [events, setEvents] = useState<EventProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAllEvents();
  }, []);

  async function getAllEvents() {
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
      console.error("Error fetching events:", error);
      setError("Failed to load events.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center text-red-500">
        <p className="text-xl font-semibold">{error}</p>
        <button
          onClick={getAllEvents}
          className="mt-4 rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
        >
          Try Again
        </button>
      </div>
    );
  }

  const filter = [
    'All', 'Conference', 'Sport', 'Expos', 'Concerts', 'Festivals', 'Performing Arts', 'Comunity'
  ]

  return (
    <div className="mx-auto px-4 py-8">
      <h1 className="mx-10 mb-4 text-3xl font-bold">All Event</h1>
      <div className="mx-10 mb-8 flex content-between gap-4">
        {filter.map((category) => {
          return <button className="btn btn-neutral btn-sm">{category}</button>
        })}
      </div>
      <div className="mx-10 grid grid-cols-4 gap-2">
        {events.map((event) => (
          <div className="mb-8" key={event.id}>
            <EventCard
              slug={event.slug}
              title={event.title}
              imageUrl={event.imageUrl}
              location={event.location}
              date={new Date(event.startDate).toLocaleDateString()}
              organizer={event.organizer?.name || "Unknown"}
              price={event.price}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
