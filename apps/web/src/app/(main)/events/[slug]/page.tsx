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
    getEvent();
  }, []);

  async function getEvent() {
    try {
      const response = await fetch("http://localhost:8000/api/events/", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setEvents(data.events);
    } catch (error) {}
  }
}

export function Page() {
  return <div>page</div>;
}
