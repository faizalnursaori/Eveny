"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import EventCard from "@/components/EventCard";
import { EventProps } from "@/utils/types/types";
import { Loader2, Search, ChevronLeft, ChevronRight } from "lucide-react";
import useDebounce from "@/utils/hooks/useDebounce";

const ITEMS_PER_PAGE = 8;

export default function Events() {
  const [events, setEvents] = useState<EventProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleFilter = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const debounceSearch = useDebounce(search, 500);

  useEffect(() => {
    searchEvent();
  }, [debounceSearch, selectedCategory, currentPage]);

  const searchEvent = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:8000/api/events");
      const filteredEvents = res.data.events.filter(
        (event: { title: string; category: string }) => {
          const titleMatch = event.title
            .toLowerCase()
            .includes(debounceSearch.toLowerCase());
          const categoryMatch =
            selectedCategory === "All" || event.category === selectedCategory;
          return titleMatch && categoryMatch;
        },
      );

      const totalFilteredEvents = filteredEvents.length;
      setTotalPages(Math.ceil(totalFilteredEvents / ITEMS_PER_PAGE));

      const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      const paginatedEvents = filteredEvents.slice(startIndex, endIndex);

      setEvents(paginatedEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
      setError("Failed to load events.");
    } finally {
      setLoading(false);
    }
  };

  const filter = [
    "All",
    "Workshop",
    "Sport",
    "Movie",
    "Concerts",
    "Festivals",
    "Performing Arts",
    "Community",
  ];

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  if (error) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-gray-100">
        <p className="mb-4 text-xl font-semibold text-red-500">{error}</p>
        <button
          onClick={searchEvent}
          className="rounded-lg bg-blue-500 px-6 py-2 text-white transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="container mx-auto">
        <h1 className="mb-8 text-4xl font-bold text-gray-800">
          Discover Events
        </h1>

        <div className="mb-8 flex flex-col items-start space-y-4 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
          <div className="relative w-full max-w-md">
            <input
              type="search"
              className="w-full rounded-full border border-gray-300 bg-white py-2 pl-4 pr-10 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search events..."
              onChange={handleSearch}
            />
            <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <div className="flex flex-wrap gap-2">
            {filter.map((category) => (
              <button
                key={category}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => handleFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {events.map((event) => (
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

            {events.length === 0 && (
              <div className="mt-8 text-center text-gray-500">
                No events found. Try adjusting your search or filters.
              </div>
            )}

            {events.length > 0 && (
              <div className="mt-8 flex items-center justify-center space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="rounded-full bg-white p-2 text-gray-600 transition-colors hover:bg-gray-100 disabled:opacity-50"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <span className="text-gray-600">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="rounded-full bg-white p-2 text-gray-600 transition-colors hover:bg-gray-100 disabled:opacity-50"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
