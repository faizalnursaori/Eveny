"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { EventProps } from "@/utils/types/types";
import {
  Loader2,
  Calendar,
  MapPin,
  User,
  Share2,
  Heart,
  Minus,
  Plus,
} from "lucide-react";
import Image from "next/image";
import ReviewSection from "@/components/ReviewEvent";
import { formatIDR } from "@/utils/helper/eventCardHelper";

const baseUrl = "http://localhost:8000";

export default function EventDetail() {
  const [event, setEvent] = useState<EventProps | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [liked, setLiked] = useState<boolean>(false);
  const [ticketCount, setTicketCount] = useState<number>(1);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [hasToken, setHasToken] = useState<boolean>(false);
  const [hasPurchasedTicket, setHasPurchasedTicket] = useState<boolean>(false);

  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    getEventDetails();
    const storedUserInfo = localStorage.getItem("userInfo");
    const token = localStorage.getItem("token");
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
    setHasToken(!!token);
  }, []);

  async function getEventDetails() {
    try {
      const response = await axios.get(`${baseUrl}/api/events/${params.slug}`);
      setEvent(response.data.event);
    } catch (error) {
      console.error("Error fetching event details:", error);
      setError("Failed to load event details.");
    } finally {
      setLoading(false);
    }
  }

  const handleTicketChange = (change: number) => {
    setTicketCount((prev) =>
      Math.max(1, Math.min(prev + change, event?.availableSeat || 1)),
    );
  };

  const checkTicketPurchase = async () => {
    if (!hasToken || !userInfo || !event) return;

    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${baseUrl}/api/transactions/user/${userInfo.id}/event/${event.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setHasPurchasedTicket(response.data.hasPurchased);
    } catch (error) {
      console.error("Error checking ticket purchase:", error);
      setHasPurchasedTicket(false);
    }
  };

  const getTotalPrice = () => {
    if (!event || event.isFree) return "Free";
    return formatIDR(event.price * ticketCount);
  };

  const handlePurchase = async () => {
    if (!event || isPurchasing) return;
    if (!userInfo) {
      router.push("/login");
      return;
    }

    setIsPurchasing(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await axios.post(
        `${baseUrl}/api/transactions`,
        {
          eventId: event.id,
          totalPrice: event.price * ticketCount,
          finalPrice: event.price * ticketCount,
          discount: 0,
          pointsUsed: 0,
          userId: userInfo.id,
          voucherId: null,
          quantity: ticketCount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log("Transaction created:", response.data);

      if (response.data && response.data.transaction) {
        // Fetch the updated event details
        const updatedEventResponse = await axios.get(
          `${baseUrl}/api/events/${event.slug}`,
        );
        if (updatedEventResponse.data && updatedEventResponse.data.event) {
          setEvent(updatedEventResponse.data.event);
        }
      }

      alert("Transaction successful! Redirecting to transaction details...");
      router.push(`/transaction/${response.data.id}`);
    } catch (error) {
      console.error("Error creating transaction:", error);
      alert("Failed to create transaction. Please try again.");
    } finally {
      setIsPurchasing(false);
    }
  };

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
          onClick={getEventDetails}
          className="rounded bg-blue-500 px-6 py-2 text-white transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!event) {
    return <div className="p-8 text-center text-xl">Event not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-4xl font-bold text-gray-800">{event.title}</h1>
          <div className="flex space-x-4">
            <button
              onClick={() => setLiked(!liked)}
              className={`rounded-full p-2 transition-colors ${
                liked ? "bg-red-500 text-white" : "bg-gray-200 text-gray-600"
              }`}
            >
              <Heart className="h-6 w-6" />
            </button>
            <button className="rounded-full bg-gray-200 p-2 text-gray-600 transition-colors hover:bg-gray-300">
              <Share2 className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="mb-8 grid gap-8 md:grid-cols-2">
          <div>
            <Image
              src={
                event.imageUrl ? `${baseUrl}${event.imageUrl}` : "/200x200.png"
              }
              width={1080}
              height={1080}
              alt={event.title}
              className="w-full rounded-lg object-cover shadow-lg"
              style={{ height: "400px" }}
            />
          </div>
          <div className="flex flex-col justify-between rounded-lg bg-white p-6 shadow-lg">
            <div>
              <p className="mb-4 text-lg text-blue-600">{event.category}</p>
              <div className="mb-4 flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-gray-600" />
                <span>
                  {new Date(event.startDate).toLocaleDateString()} -{" "}
                  {new Date(event.endDate).toLocaleDateString()}
                </span>
              </div>
              <div className="mb-4 flex items-center">
                <MapPin className="mr-2 h-5 w-5 text-gray-600" />
                <span>{event.location}</span>
              </div>
              <div className="mb-4 flex items-center">
                <User className="mr-2 h-5 w-5 text-gray-600" />
                <span>{event.organizer?.name || "Unknown"}</span>
              </div>
              <div className="mb-4 flex items-center">
                <span className="text-xl font-semibold">
                  {event.isFree ? "Free" : formatIDR(event.price)}
                </span>
              </div>
              <p className="text-lg">
                Available Seats:{" "}
                <span className="font-semibold">{event.availableSeat}</span> /{" "}
                {event.maxAttendees}
              </p>
            </div>
            <div className="mt-6">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-lg font-semibold">Tickets:</span>
                <div className="flex items-center">
                  <button
                    onClick={() => handleTicketChange(-1)}
                    className="rounded-full bg-gray-200 p-1 text-gray-600 transition-colors hover:bg-gray-300"
                  >
                    <Minus className="h-5 w-5" />
                  </button>
                  <span className="mx-4 text-xl font-semibold">
                    {ticketCount}
                  </span>
                  <button
                    onClick={() => handleTicketChange(1)}
                    className="rounded-full bg-gray-200 p-1 text-gray-600 transition-colors hover:bg-gray-300"
                  >
                    <Plus className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <p className="mb-4 text-xl font-semibold">
                Total: {getTotalPrice()}
              </p>
            </div>
            <button
              onClick={handlePurchase}
              className="w-full rounded-lg bg-blue-500 px-6 py-3 text-lg font-semibold text-white transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400"
              disabled={
                !event ||
                event.availableSeat < ticketCount ||
                isPurchasing ||
                !hasToken
              }
            >
              {isPurchasing ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : hasToken ? (
                "Purchase Tickets"
              ) : (
                "Login to Purchase"
              )}
            </button>
          </div>
        </div>

        <div className="mb-12 rounded-lg bg-white p-8 shadow-lg">
          <h2 className="mb-4 text-2xl font-semibold text-gray-800">
            About this event
          </h2>
          <p className="leading-relaxed text-gray-700">{event.description}</p>
        </div>

        {event && hasToken && (
          <div className="rounded-lg bg-white p-8 shadow-lg">
            <h2 className="mb-6 text-2xl font-semibold text-gray-800">
              Reviews
            </h2>
            <ReviewSection eventId={event.id} />
          </div>
        )}
        {event && !hasToken && (
          <div className="rounded-lg bg-white p-8 shadow-lg">
            <p className="text-center text-gray-600">
              Please log in to view and leave reviews.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
