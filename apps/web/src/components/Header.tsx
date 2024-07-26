"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <header className="bg-base-100 shadow-md">
      <div className="container navbar mx-auto">
        <div className="navbar-start">
          <h1 className="text-xl font-bold tracking-widest">
            Eveny<span className="text-orange-500">.</span>
          </h1>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-lg font-medium">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/events">Events</Link>
            </li>
            <li>
              <Link href="/about">About Us</Link>
            </li>
          </ul>
        </div>

        <div className="navbar-end">
          <div className="hidden items-center gap-2 md:flex">
            {isLoggedIn ? (
              <>
                <button className="btn btn-ghost btn-sm">
                  <Link href={"/dashboard"}>Dashboard</Link>
                </button>
                <button onClick={handleLogout} className="btn btn-ghost btn-sm">
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/register"
                  className="btn btn-outline btn-primary btn-sm"
                >
                  Sign Up
                </Link>
                <Link href="/login" className="btn btn-ghost btn-sm">
                  Log In
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
