"use client";

import Link from "next/link";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { handleLogin } from "@/api/auth";
import axios from "axios";
import { useRouter } from "next/navigation";
import { cookies } from "next/headers";


export default function Page() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const base_api = "http://localhost:8000/auth";
  const router = useRouter();

  const toggleVisibility = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post(`${base_api}/login`, { email, password });
      const token = res.data.token; // Adjust this line according to your API response structure
      localStorage.setItem("token", token); // Store the token in local storage
      toast.success("Login success!");
      router.push("/");
    } catch (error) {
      console.error(error);
      toast.error("Login failed. Please check your credentials and try again.");
    } finally {
      setIsLoading(false);
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
            Login to get access to all of our available feature
          </p>
        </div>
      </section>
      <section className="flex flex-1 items-center justify-center py-8">
        <div className="card w-full max-w-md bg-base-100 p-8 shadow-xl">
          <div className="card-body">
            <h3 className="card-title mb-4 text-2xl">Sign In</h3>
            <form className="form-control gap-4" onSubmit={handleSubmit}>
              <div className="form-control relative focus-within:border-white">
                <input
                  onChange={(e) => setEmail(e.target.value)}
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
                  onChange={(e) => setPassword(e.target.value)}
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
              <div className="form-control mt-6">
                <button className="btn btn-success mb-4" disabled={isLoading}>
                  {isLoading ? "Logging in..." : "Login"}
                </button>
                <p className="text-center">
                  Don't have an account?{" "}
                  <Link
                    href={"/register"}
                    className="font-semibold text-indigo-500 hover:underline"
                  >
                    Sign Up
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
