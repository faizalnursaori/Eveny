import React from "react";

export interface ExplanationCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface EventCardProps {
  slug: string;
  title: string;
  imageUrl: string;
  location: string;
  date: string;
  organizer: string;
  price: number;
}

export interface EventProps {
  id: number;
  slug: string;
  category: string;
  title: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  availableSeat: number;
  maxAttendees: number;
  imageUrl: string;
  isFree: boolean;
  price: number;
  organizer: {
    name: string;
  };
}
