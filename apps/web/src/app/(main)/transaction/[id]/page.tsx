"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { Transaction } from "@/utils/types/types";
import { formatPriceToIDR } from "@/utils/helper/transactionHelper";

const baseUrl = "http://localhost:8000";

export default function TransactionDetail() {
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    getTransactionDetails();
  }, []);

  async function getTransactionDetails() {
    try {
      const response = await axios.get(
        `${baseUrl}/api/transactions/${params.id}`,
      );
      setTransaction(response.data);
    } catch (error) {
      console.error("Error fetching transaction details:", error);
      setError("Failed to load transaction details.");
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
          onClick={getTransactionDetails}
          className="rounded bg-blue-500 px-6 py-2 text-white transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!transaction) {
    return (
      <div className="p-8 text-center text-xl">Transaction not found.</div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-4xl font-bold text-gray-800">
            Transaction Details
          </h1>
          <span
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              transaction.status === "pending"
                ? "bg-yellow-200 text-yellow-800"
                : transaction.status === "completed"
                  ? "bg-green-200 text-green-800"
                  : "bg-red-200 text-red-800"
            }`}
          >
            {transaction.status.charAt(0).toUpperCase() +
              transaction.status.slice(1)}
          </span>
        </div>
        <div className="rounded-lg bg-white p-6 shadow-lg">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <h2 className="mb-4 text-2xl font-semibold text-gray-800">
                Transaction ID: {transaction.id}
              </h2>
              <p className="mb-2 text-lg">
                <span className="font-semibold">Event ID:</span>{" "}
                {transaction.eventId}
              </p>
              <p className="mb-2 text-lg">
                <span className="font-semibold">User ID:</span>{" "}
                {transaction.userId}
              </p>
              <p className="mb-2 text-lg">
                <span className="font-semibold">Quantity:</span>{" "}
                {transaction.quantity}
              </p>
              <p className="mb-2 text-lg">
                <span className="font-semibold">Voucher ID:</span>{" "}
                {transaction.voucherId || "N/A"}
              </p>
            </div>
            <div>
              <h3 className="mb-4 text-xl font-semibold text-gray-800">
                Price Details
              </h3>
              <p className="mb-2 text-lg">
                <span className="font-semibold">Total Price:</span> 
                {formatPriceToIDR(transaction.totalPrice)}
              </p>
              <p className="mb-2 text-lg">
                <span className="font-semibold">Discount:</span> 
                {formatPriceToIDR(transaction.discount)}
              </p>
              <p className="mb-2 text-lg">
                <span className="font-semibold">Points Used:</span>{" "}
                {transaction.pointsUsed}
              </p>
              <p className="mb-2 text-lg font-semibold text-green-600">
                Final Price: {formatPriceToIDR(transaction.finalPrice)}
              </p>
            </div>
          </div>
          <div className="mt-6 border-t pt-4">
            <p className="text-lg text-gray-600">
              <span className="font-semibold">Created At:</span>{" "}
              {new Date(transaction.transactionDate).toLocaleString()}
            </p>
          </div>
        </div>
        <button
          onClick={() => router.push(`/events`)}
          className="mt-6 rounded bg-blue-500 px-6 py-2 text-white transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Go Back to Event List
        </button>
      </div>
    </div>
  );
}
