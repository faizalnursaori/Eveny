"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CircleUserRound } from "lucide-react";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/login");
  };

  return (
    <header className="bg-base-100 shadow-md">
      <div className="container navbar mx-auto">
        <div className="navbar-start">
          <h1 className="text-xl font-bold tracking-widest">
            <Link href="/">
              Eveny<span className="text-orange-500">.</span>
            </Link>
          </h1>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-lg font-medium">
            <li className="mx-2">
              <Link href="/">Home</Link>
            </li>
            <li className="mx-2">
              <Link href="/events">Events</Link>
            </li>
            <li className="mx-2">
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

          <div className="items-center md:hidden">
            <details className="dropdown dropdown-left">
              <summary className="btn m-1">
                <CircleUserRound />
              </summary>
              <ul className="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow">
                {isLoggedIn ? (
                  <>
                    <li>
                      <Link href={"/dashboard"}>Dashboard</Link>
                    </li>
                  </>
                ) : (
                  <></>
                )}
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/events">Events</Link>
                </li>
                <li>
                  <Link href="/about">About</Link>
                </li>
                {isLoggedIn ? (
                  <>
                    <li>
                      <li>
                        <button
                          onClick={handleLogout}
                          className="btn"
                        >
                          Log Out
                        </button>
                      </li>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link
                        href="/register"
                        className="btn btn-outline btn-primary btn-sm"
                      >
                        Sign Up
                      </Link>
                    </li>
                    <li>
                      <Link href="/login" className="btn btn-ghost btn-sm">
                        Log In
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </details>
          </div>
        </div>
      </div>
    </header>
  );
}
