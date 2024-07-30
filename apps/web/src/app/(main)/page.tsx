"use client";
import Hero from "@/components/Hero";
import EventCard from "@/components/EventCard";
import Explanation from "@/components/Explanation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { EventProps } from "@tremor/react";
import axios from "axios";
import { Loader2 } from "lucide-react";

export default function Home() {
  const [events, setEvents] = useState<EventProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAllEvents();
  }, []);

  async function getAllEvents() {
    try {
      const response = await axios.get("http://localhost:8000/api/events");
      setEvents(response.data.events);
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
  return (
    <main className="container mx-auto px-4">
      <section className="mb-16">
        <Hero />
      </section>

      <section className="mb-16">
        <h2 className="mb-8 text-3xl font-light">Events for you</h2>
        <div className="mx-auto grid w-full grid-cols-1 items-center md:grid-cols-3">
          {events.map((event, index) => {
            if (index < 5) {
              return (
                <EventCard
                  key={event?.id}
                  slug={event?.slug}
                  title={event?.title}
                  imageUrl={event?.imageUrl}
                  location={event?.location}
                  date={new Date(event?.startDate).toLocaleDateString()}
                  organizer={event?.organizer?.name || "Unknown"}
                  price={event?.price}
                  isFree={event?.isFree}
                />
              );
            }
          })}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="mb-8 text-3xl font-light">How eveny works?</h2>
        <div className="flex justify-center">
          <Explanation />
        </div>
      </section>
    </main>
  );
}
