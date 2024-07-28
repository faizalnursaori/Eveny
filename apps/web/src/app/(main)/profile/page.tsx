"use client";
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
import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { editUser } from "@/api/auth";

export default function Profile() {
  const userRaw = localStorage.getItem("userInfo");
  const userInfo = JSON.parse(userRaw);

  const [data, setData] = useState({});
  const [user, setUser] = useState({});
  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8000/auth/user/${userInfo.id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();
      setUser(data.user);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  }

  console.log(user);
  
  const { username, email, referralCode, name, phoneNumber, role, id } = user;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // e.preventDefault();
    try {
      editUser(id, data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Toaster />
      <Card className="flex flex-col items-center justify-center">
        <CardHeader className="flex items-center justify-center text-2xl font-bold">
          <CircleUserRound size={80} />
          {name}
        </CardHeader>
        <div className="divider divider-secondary divider-horizontal"></div>
        <CardContent className="flex h-full w-full flex-col justify-around gap-6">
          <div className="flex flex-row justify-between">
            <p className="text-2xl font-bold">Username</p>
            <p className="text-xl font-semibold">{username}</p>
          </div>
          <div className="flex flex-row justify-between">
            <p className="text-2xl font-bold">Email</p>
            <p className="text-xl font-semibold">{email}</p>
          </div>
          <div className="flex flex-row justify-between">
            <p className="text-2xl font-bold">Referral Code</p>
            <p className="text-xl font-semibold">{referralCode}</p>
          </div>
          <div className="flex flex-row justify-between">
            <p className="text-2xl font-bold">Phone Number</p>
            <p className="text-xl font-semibold">
              {phoneNumber ? phoneNumber : "-"}
            </p>
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
                    placeholder={name}
                    className="peer input input-bordered relative z-0 w-full focus:outline-none"
                  />
                </div>
                <div className="form-control">
                  <label htmlFor="name" className="label">
                    <span className="">Username</span>
                  </label>
                  <input
                    onChange={handleChange}
                    type="text"
                    name="username"
                    id="name"
                    placeholder={username}
                    className="peer input input-bordered relative z-0 w-full focus:outline-none"
                  />
                </div>
                <div className="form-control">
                  <label htmlFor="name" className="label">
                    <span className="">Phone Number</span>
                  </label>
                  <input
                    onChange={handleChange}
                    type="text"
                    name="phoneNumber"
                    id="name"
                    placeholder={phoneNumber}
                    className="peer input input-bordered relative z-0 w-full focus:outline-none"
                  />
                </div>
                <div className="form-control">
                  <button className="btn btn-success my-4">Edit</button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </div>
  );
}
