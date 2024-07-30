"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CircleUserRound } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { editUser } from "@/api/auth";
import { User } from "@/utils/types/types";
import axios from "axios";

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [data, setData] = useState<Partial<User>>({});
  const [point, setPoint] = useState<number>();

  useEffect(() => {
    const userData = localStorage.getItem("userInfo");
    if (userData) {
      setUser(JSON.parse(userData));
    }
    getPoint();
  }, []);

  const getPoint = async () => {
    try {
      const userData = localStorage.getItem("userInfo");
      const token = localStorage.getItem("token");
      const user = JSON.parse(userData);
      const res = await axios.get(
        `http://localhost:8000/auth/user/point/${user.id}`,{
          headers: {Authorization: `Bearer ${token}`}
        }
      );
      const filteredPoints = res.data.points.filter((point : {userId: number}) => {
          return user.id === point.userId
      })
      let totalPoints = 0
      filteredPoints.forEach((point : {amount: number}) => totalPoints += point.amount )
      setPoint(totalPoints)
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;
    try {
      await editUser(user.id, data);
      // Update localStorage after successful edit
      const updatedUser = { ...user, ...data };
      localStorage.setItem("userInfo", JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (error) {
      console.log(error);
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <Toaster />
      <Card className="flex flex-col items-center justify-center">
        <CardHeader className="flex items-center justify-center text-2xl font-bold">
          <CircleUserRound size={80} />
          {user.name}
        </CardHeader>
        <div className="divider divider-secondary divider-horizontal"></div>
        <CardContent className="flex h-full w-full flex-col justify-around gap-6">
          <div className="flex flex-row justify-between">
            <p className="text-2xl font-bold">Username</p>
            <p className="text-xl font-semibold">{user.username}</p>
          </div>
          <div className="flex flex-row justify-between">
            <p className="text-2xl font-bold">Email</p>
            <p className="text-xl font-semibold">{user.email}</p>
          </div>
          <div className="flex flex-row justify-between">
            <p className="text-2xl font-bold">Phone Number</p>
            <p className="text-xl font-semibold">{user.phoneNumber || "-"}</p>
          </div>
          <div className="flex flex-row justify-between">
            <p className="text-2xl font-bold">Referral Code</p>
            <p className="text-xl font-semibold">{user.referralCode || "-"}</p>
          </div>
          <div className="flex flex-row justify-between">
            <p className="text-2xl font-bold">Points</p>
            <p className="text-xl font-semibold">{point?.toLocaleString('id-ID')}</p>
          </div>
        </CardContent>
        <CardFooter>
          <Dialog>
            <DialogTrigger asChild>
              <button className="btn btn-outline btn-accent">
                Edit Profile
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you're
                  done.
                </DialogDescription>
              </DialogHeader>
              <form className="form-control" onSubmit={handleSubmit}>
                <div className="form-control">
                  <label htmlFor="name" className="label">
                    <span className="">Full Name</span>
                  </label>
                  <input
                    onChange={handleChange}
                    type="text"
                    name="name"
                    id="name"
                    placeholder={user.name}
                    className="peer input input-bordered relative z-0 w-full focus:outline-none"
                  />
                </div>
                <div className="form-control">
                  <label htmlFor="username" className="label">
                    <span className="">Username</span>
                  </label>
                  <input
                    onChange={handleChange}
                    type="text"
                    name="username"
                    id="username"
                    placeholder={user.username}
                    className="peer input input-bordered relative z-0 w-full focus:outline-none"
                  />
                </div>
                <div className="form-control">
                  <label htmlFor="phoneNumber" className="label">
                    <span className="">Phone Number</span>
                  </label>
                  <input
                    onChange={handleChange}
                    type="text"
                    name="phoneNumber"
                    id="phoneNumber"
                    placeholder={user.phoneNumber}
                    className="peer input input-bordered relative z-0 w-full focus:outline-none"
                  />
                </div>
                <div className="form-control">
                  <button type="submit" className="btn btn-success my-4">
                    Edit
                  </button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </div>
  );
}
