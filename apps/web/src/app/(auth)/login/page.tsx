import Link from "next/link";

export default function Page() {
  return (
    <main className="flex min-h-screen bg-base-200">
      <section className="flex flex-1 flex-col justify-center px-4 lg:px-20">
        <div className="space-y-4">
          <p className="text-4xl font-light text-base-content">Welcome</p>
          <p className="text-5xl leading-tight text-base-content">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>
      </section>
      <section className="flex flex-1 items-center justify-center py-8">
        <div className="card w-full max-w-md bg-base-100 p-8 shadow-xl">
          <div className="card-body">
            <h3 className="card-title mb-4 text-2xl">Sign In</h3>
            <form className="form-control gap-4">
              <div className="form-control relative focus-within:border-white">
                <input
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
                  type="password"
                  name="password"
                  id="password"
                  placeholder=" "
                  className="peer input input-bordered relative z-0 w-full focus:outline-none"
                />
                <label
                  htmlFor="password"
                  className="label pointer-events-none absolute left-3 top-1 select-none px-1 transition-all duration-300 peer-focus:-translate-y-[21px] peer-focus:text-xs peer-[:not(:placeholder-shown)]:-translate-y-[21px] peer-[:not(:placeholder-shown)]:text-xs"
                >
                  <span className="bg-base-100 px-1">Password</span>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary mb-4">Login</button>
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
