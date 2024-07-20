import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed z-10 w-screen bg-neutral/90">
      <nav className="flex items-center justify-between p-2">
        <div className="flex items-center gap-6">
          <h1 className="text-xl font-bold tracking-widest">
            Eveny<span className="text-orange-500">.</span>
          </h1>
          <div className="hidden gap-5 md:flex">
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
          <label className="input input-bordered hidden items-center gap-2 md:flex">
            <input type="text" className="grow" placeholder="Search" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        </div>
        <div className="mr-3 hidden gap-2 md:flex">
          <Link href="/register" className="btn btn-outline btn-success">
            Sign Up
          </Link>
          <Link href="/login" className="btn btn-ghost btn-success">
            Log In
          </Link>
        </div>
        <div className="flex md:hidden">
          <div className="navbar-end">
            <div className="dropdown right-4">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-circle btn-ghost"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h7"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu dropdown-content menu-sm right-2 z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
              >
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/events">Events</Link>
                </li>
                <li>
                  <Link href="/about">About Us</Link>
                </li>
                <li>
                  <button className="btn btn-ghost btn-success">
                    <Link href="/login">Log In</Link>
                  </button>
                </li>
                <li>
                  <button className="btn btn-outline btn-success mt-2">
                    <Link href="/register">Sign Up</Link>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
