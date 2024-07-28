"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Page() {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({});
  const router = useRouter();
  const base_api = "http://localhost:8000/auth";

  const toggleVisibility = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      const res = await axios.post(`${base_api}/register`, data);
      router.push("/login");
      toast.success("Account Created!");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 409) {
          toast.error(
            "User already exists. Please use a different email or username.",
          );
        } else {
          console.log(error);
          
          toast.error("An error occurred. Please try again.");
        }
      } else {
        console.error(error);
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <main className="flex min-h-screen bg-base-200">
      <div>
        <Toaster position="top-center" reverseOrder={true} />
      </div>
      <section className="flex flex-1 flex-col justify-center px-4 lg:px-20">
        <div className="space-y-4">
          <p className="text-4xl font-light text-base-content">Welcome</p>
          <p className="text-5xl leading-tight text-base-content">
            Create an Account now so you can start finding events!
          </p>
        </div>
      </section>
      <section className="flex flex-1 items-center justify-center py-8">
        <div className="card w-full max-w-md bg-base-100 p-8 shadow-xl">
          <div className="card-body">
            <h3 className="card-title mb-4 text-2xl">Create your account</h3>
            <form className="form-control gap-4" onSubmit={handleSubmit}>
              <div className="form-control relative focus-within:border-white">
                <input
                  onChange={handleChange}
                  type="text"
                  name="name"
                  id="name"
                  placeholder=" "
                  className="peer input input-bordered relative z-0 w-full focus:outline-none"
                />
                <label
                  htmlFor="name"
                  className="label pointer-events-none absolute left-3 top-1 select-none px-1 transition-all duration-300 peer-focus:-translate-y-[21px] peer-focus:text-xs peer-[:not(:placeholder-shown)]:-translate-y-[21px] peer-[:not(:placeholder-shown)]:text-xs"
                >
                  <span className="bg-base-100 px-1">Full Name</span>
                </label>
              </div>
              <div className="form-control relative focus-within:border-white">
                <input
                  onChange={handleChange}
                  type="text"
                  name="username"
                  id="username"
                  placeholder=" "
                  className="peer input input-bordered relative z-0 w-full focus:outline-none"
                />
                <label
                  htmlFor="username"
                  className="label pointer-events-none absolute left-3 top-1 select-none px-1 transition-all duration-300 peer-focus:-translate-y-[21px] peer-focus:text-xs peer-[:not(:placeholder-shown)]:-translate-y-[21px] peer-[:not(:placeholder-shown)]:text-xs"
                >
                  <span className="bg-base-100 px-1">Username</span>
                </label>
              </div>
              <div className="form-control relative focus-within:border-white">
                <input
                  onChange={handleChange}
                  type="email"
                  name="email"
                  id="email"
                  placeholder=" "
                  className="peer input input-bordered relative z-0 w-full focus:outline-none"
                />
                <label
                  htmlFor="email"
                  className="label pointer-events-none absolute left-3 top-1 select-none px-1 transition-all duration-300 peer-focus:-translate-y-[21px] peer-focus:text-xs peer-[:not(:placeholder-shown)]:-translate-y-[21px] peer-[:not(:placeholder-shown)]:text-xs"
                >
                  <span className="bg-base-100 px-1">E-mail</span>
                </label>
              </div>
              <div className="form-control relative focus-within:border-white">
                <input
                  onChange={handleChange}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder=" "
                  className="peer input input-bordered relative z-0 w-full pr-10 focus:outline-none"
                />
                <label
                  htmlFor="password"
                  className="label pointer-events-none absolute left-3 top-1 select-none px-1 transition-all duration-300 peer-focus:-translate-y-[21px] peer-focus:text-xs peer-[:not(:placeholder-shown)]:-translate-y-[21px] peer-[:not(:placeholder-shown)]:text-xs"
                >
                  <span className="bg-base-100 px-1">Password</span>
                </label>
                <button
                  onClick={(e) => toggleVisibility(e)}
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 focus:outline-none"
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-eye"
                    >
                      <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-eye-off"
                    >
                      <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
                      <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
                      <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" />
                      <path d="m2 2 20 20" />
                    </svg>
                  )}
                </button>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Referral Code (Optional)</span>
                </label>
                <input
                  onChange={handleChange}
                  type="text"
                  name="referralCode"
                  placeholder="Enter referral code"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-success mb-4">Register</button>
                <p className="text-center">
                  Already have an account?{" "}
                  <Link
                    href={"/login"}
                    className="font-semibold text-green-700 hover:underline"
                  >
                    Sign In
                  </Link>
                </p>
                <div className="mt-4 flex w-80 flex-col items-center justify-center gap-8">
                  <Link
                    className="relative inline-flex items-center justify-center text-sm no-underline outline-none transition-opacity hover:opacity-80 active:opacity-60"
                    href="/"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2"
                    >
                      <path d="m12 19-7-7 7-7"></path>
                      <path d="M19 12H5"></path>
                    </svg>
                    <span className="flex items-center">Back to Home page</span>
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
