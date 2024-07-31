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
  isFree: boolean;
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

export interface TransactionProps {
  eventTitle: string;
  price: number;
}

export interface User {
  id: number;
  role: string;
  username: string;
  email: string;
  name: string;
  phoneNumber: string;
  referralCode: string | null;
  createdAt: string;
  updatedAt: string;
  referredById: number | null;
}

export interface ReviewProps {
  id: number;
  rating: number;
  comment: string;
  user: {
    name: string;
  };
}

export enum TransactionStatus {
  pending = "pending",
  completed = "completed",
  failed = "failed",
}

export interface Transaction {
  id: number;
  eventId: number;
  totalPrice: number;
  finalPrice: number;
  discount: number;
  pointsUsed: number;
  transactionDate: Date;
  status: TransactionStatus;
  userId: number;
  voucherId?: number;
  createdAt: string;
  quantity: number;
}

export interface NewTransaction {
  eventId: number;
  totalPrice: number;
  finalPrice: number;
  discount: number;
  pointsUsed: number;
  userId: number;
  voucherId?: number | null;
}

export interface VoucherProps {
  id: number;
  name: string;
  discount: number;
  expiryDate: Date;
  maxUsage: number;
  usage: number;
  createdAt: Date;
  updatedAt: Date;
  eventId: number;
  userId: number;
}
