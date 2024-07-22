import Link from "next/link";

export default function Header() {
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
            <div className="form-control">
              <input
                type="text"
                placeholder="Search"
                className="input input-bordered w-24 md:w-auto"
              />
            </div>
            <Link
              href="/register"
              className="btn btn-outline btn-primary btn-sm"
            >
              Sign Up
            </Link>
            <Link href="/login" className="btn btn-ghost btn-sm">
              Log In
            </Link>
          </div>

          <div className="dropdown dropdown-end md:hidden">
            <label tabIndex={0} className="btn btn-circle btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
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
                <Link href="/login">Log In</Link>
              </li>
              <li>
                <Link href="/register">Sign Up</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
