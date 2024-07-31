'use client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import toast from "react-hot-toast";
import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export function CancelDialog({ id }: { id: number }) {

  const handleConfirm = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const res = await axios.delete(`http://localhost:8000/api/transactions/${id}`);
      toast("Transaction canceled.");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog >
      <DialogTrigger>
        <p>Cancel</p>
      </DialogTrigger>
      <DialogContent className="bg-gray-600 text-white">
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            Are you sure you want to cancel this transaction?
          </DialogDescription>
          <div className="flex gap-5">
          <button className="btn btn-error" onClick={handleConfirm}>
            Cancel
          </button>
          <DialogClose>
            <button className="btn btn-outline">Keep</button>
          </DialogClose>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
export function ConfirmDialog({ id, }: { id: number }) {
  const router = useRouter()
  const handleConfirm = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const res = await axios.patch(`http://localhost:8000/api/transactions/${id}`,{
        status: 'paid'
      });
      toast("Transaction Success.");
      router.push(`/transaction/${id}`)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog >
      <DialogTrigger>
        <p>Pay</p>
      </DialogTrigger>
      <DialogContent className="bg-gray-600 text-white">
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            Are you sure you want to pay for this transaction?
          </DialogDescription>
          <div className="flex gap-5">
          <button className="btn btn-error" onClick={handleConfirm}>
            Confirm
          </button>
          <DialogClose>
            <button className="btn btn-outline">Cancel</button>
          </DialogClose>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
export function CompleteDialog({ id, }: { id: number }) {
  const router = useRouter()
  const handleConfirm = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const res = await axios.patch(`http://localhost:8000/api/transactions/${id}`,{
        status: 'completed'
      });
      toast("Transaction Success.");
      router.push(`/transaction/${id}`)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog >
      <DialogTrigger>
        <p>Confirm</p>
      </DialogTrigger>
      <DialogContent className="bg-gray-600 text-white">
        <DialogHeader>
          <DialogTitle>Complete Transaction</DialogTitle>
          <DialogDescription>
            Are you sure you want to Accept this payment?
          </DialogDescription>
          <div className="flex gap-5">
          <button className="btn btn-success" onClick={handleConfirm}>
            Confirm
          </button>
          <DialogClose>
            <button className="btn btn-outline">Cancel</button>
          </DialogClose>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
export function RejectDialog({ id, }: { id: number }) {
  const router = useRouter()
  const handleConfirm = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const res = await axios.patch(`http://localhost:8000/api/transactions/${id}`,{
        status: 'failed'
      });
      toast("Transaction Success.");
      router.push(`/transaction/${id}`)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog >
      <DialogTrigger>
        <p>Reject</p>
      </DialogTrigger>
      <DialogContent className="bg-gray-600 text-white">
        <DialogHeader>
          <DialogTitle>Reject Transaction.</DialogTitle>
          <DialogDescription>
            Are you sure you want to reject this payment?
          </DialogDescription>
          <div className="flex gap-5">
          <button className="btn btn-error" onClick={handleConfirm}>
            Reject
          </button>
          <DialogClose>
            <button className="btn btn-outline">Cancel</button>
          </DialogClose>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
