import React from "react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed z-10 bg-neutral/90 w-screen">
      <nav className="flex items-center justify-between p-2">
        <div className="flex gap-6 items-center">
          <h1 className="text-xl font-bold tracking-widest">
            Eveny<span className="text-orange-500">.</span>
          </h1>
          <div className="flex gap-5">
            <Link href="/" className="text-center text-xl font-semibold">
              Home
            </Link>
            <Link href="/events" className="text-center text-xl font-semibold">
              Events
            </Link>
            <Link href="/about" className="text-center text-xl font-semibold">
              About Us
            </Link>
          </div>
          <label className="input input-bordered flex items-center gap-2">
            <input type="text" className="grow" placeholder="Search" />
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
        </div>
        <div className="flex gap-2 mr-3">
          <button className="btn btn-outline btn-success">Sign Up</button>
          <button className="btn btn-ghost btn-success">Log In</button>
        </div>
      </nav>
    </header>
  );
}
