"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { EventProps } from "@/utils/types/types";
import { Loader2, Calendar, MapPin, User, DollarSign } from "lucide-react";
import Image from "next/image";
import ReviewSection from "@/components/ReviewEvent";

const baseUrl = "http://localhost:8000";

export default function EventDetail() {
  const [event, setEvent] = useState<EventProps | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();

  useEffect(() => {
    getEventDetails();
  }, []);

  async function getEventDetails() {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/events/${params.slug}`,
      );
      setEvent(response.data.event);
    } catch (error) {
      console.error("Error fetching event details:", error);
      setError("Failed to load event details.");
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
          onClick={getEventDetails}
          className="mt-4 rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!event) {
    return <div className="p-4 text-center">Event not found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">{event.title}</h1>
        <p className="text-gray-600">{event.category}</p>
      </div>

      <div className="mb-8">
        <Image
          src={event.imageUrl ? `${baseUrl}${event.imageUrl}` : "/200x200.png"}
          width={1920}
          height={1080}
          alt={event.title}
          className="w-full rounded-lg object-cover"
          style={{ height: "400px" }}
        />
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="flex items-center">
          <Calendar className="mr-2 h-5 w-5" />
          <span>
            {new Date(event.startDate).toLocaleDateString()} -{" "}
            {new Date(event.endDate).toLocaleDateString()}
          </span>
        </div>
        <div className="flex items-center">
          <MapPin className="mr-2 h-5 w-5" />
          <span>{event.location}</span>
        </div>
        <div className="flex items-center">
          <User className="mr-2 h-5 w-5" />
          <span>{event.organizer?.name || "Unknown"}</span>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="mb-2 text-2xl font-semibold">About this event</h2>
        <p className="text-gray-700">{event.description}</p>
      </div>

      <div className="mb-8">
        <h2 className="mb-2 text-2xl font-semibold">Ticket Information</h2>
        <div className="flex items-center">
          <DollarSign className="mr-2 h-5 w-5" />
          <span>{event.isFree ? "Free" : `$${event.price}`}</span>
        </div>
        <p className="mt-2">
          Available Seats: {event.availableSeat} / {event.maxAttendees}
        </p>
      </div>

      <button className="rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600">
        Register for Event
      </button>

      {event && <ReviewSection eventId={event.id} />}

    </div>
  );
}
