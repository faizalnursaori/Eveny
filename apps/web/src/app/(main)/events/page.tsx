"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import EventCard from "@/components/EventCard";
import { EventProps } from "@/utils/types/types";
import { Loader2 } from "lucide-react";
import useDebounce from "@/utils/hooks/useDebounce";

export default function Events() {
  const [events, setEvents] = useState<EventProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string | null>();
  const [filteredEvents, setFilteredEvents] = useState<string | null>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  // const handleFilter = (e: React.MouseEvent<HTMLButtonElement>) => {
  //     setFilteredEvents(e.target.value)
  //     console.log(filteredEvents);
      
  // };

  const debounceSearch = useDebounce(search, 500);
  const searchEvent = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/events");
      const filteredEvent = res.data.events.filter(
        (event: { title: string }) => {
          return event.title.includes(`${debounceSearch}`);
        },
      );
      setEvents(filteredEvent);
    } catch (error) {
      console.error("Error fetching events:", error);
      setError("Failed to load events.");
    } finally {
      setLoading(false);
    }
  };

  // const filterEvent = async () =>{
  //   try {
  //     const res = await axios.get("http://localhost:8000/api/events");
  //     const filteredEvent =  res.data.events.filter(
  //       (event: { category: string }) => {
  //         return event.category.includes(`${filteredEvents}`);
  //       },
  //     );
  //     setEvents(filteredEvent)
  //   } catch (error) {
  //     console.error("Error fetching events:", error);
  //     setError("Failed to load events.");
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  useEffect(() => {
    if (debounceSearch === null || debounceSearch === undefined) {
      getAllEvents();
    } else {
      searchEvent()
    } 
  }, [debounceSearch, filteredEvents]);

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
    "All",
    "Conference",
    "Sport",
    "Expos",
    "Concerts",
    "Festivals",
    "Performing Arts",
    "Comunity",
  ];

  return (
    <div className="mx-auto px-4 py-8">
      <h1 className="mx-10 mb-4 text-3xl font-bold">All Event</h1>
      <label className="input input-bordered mx-10 mb-4 flex max-w-[25%] items-center gap-2">
        <input
          type="search"
          className="max-w-full grow"
          placeholder="Search"
          onChange={handleSearch}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path
            fill-rule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clip-rule="evenodd"
          />
        </svg>
      </label>
      <div className="mx-10 mb-8 flex content-between gap-4">
        {filter.map((category, index) => {
          return (
            <button key={index} value={category} className="btn btn-neutral btn-sm" >
              {category}
            </button>
          );
        })}
      </div>
      <div className="mx-10 grid grid-cols-4 gap-2">
        {events.map((event) => (
          <div key={event.id} className="mb-8">
            <EventCard
              slug={event.slug}
              title={event.title}
              imageUrl={event.imageUrl}
              location={event.location}
              date={new Date(event.startDate).toLocaleDateString()}
              organizer={event.organizer?.name || "Unknown"}
              price={event.price}
              isFree={event.isFree}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
