"use client";
import Hero from "@/components/Hero";
import EventCard from "@/components/EventCard";
import Explanation from "@/components/Explanation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { EventProps } from "@/utils/types/types";
import axios from "axios";
import { Loader2, ArrowRight } from "lucide-react";

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
        <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <p className="mb-4 text-xl font-semibold text-red-500">{error}</p>
        <button
          onClick={getAllEvents}
          className="rounded-full bg-blue-500 px-6 py-2 text-white transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]">
      <div className="container mx-auto px-4">
        <section className="py-16">
          <Hero />
        </section>

        <section className="py-16">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-3xl font-bold text-gray-800">Events for you</h2>
            <Link
              href="/events"
              className="flex items-center text-blue-600 hover:underline"
            >
              View all events
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {events.slice(0, 3).map((event) => (
              <EventCard
                key={event.id}
                slug={event.slug}
                title={event.title}
                imageUrl={event.imageUrl}
                location={event.location}
                date={new Date(event.startDate).toLocaleDateString()}
                organizer={event.organizer?.name || "Unknown"}
                price={event.price}
                isFree={event.isFree}
              />
            ))}
          </div>
        </section>

        <section className="py-16">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-800">
            How Eveny works?
          </h2>
          <div className="flex justify-center">
            <Explanation />
          </div>
        </section>
      </div>
    </main>
  );
}
