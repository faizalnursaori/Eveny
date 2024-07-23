"use client";

import EventCard from "@/components/EventCard";
import { EventProps } from "@/utils/types/types";
import { useState, useEffect } from "react";

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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {events.map((event) => (
        <EventCard
          slug={event.slug}
          key={event.id}
          title={event.title}
          description={event.description}
          imageUrl={event.imageUrl}
          location={event.location}
          date={new Date(event.startDate).toLocaleDateString()}
          organizer={event.organizer?.name || "Unknown"}
        />
      ))}
    </div>
  );
}
