import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <>
      <main>
        <section>
          <div className="flex h-[67vh] w-full items-center justify-center">
            <div className="mx-8 flex w-full flex-col items-center justify-center text-center">
              <div className="space-y-8 md:w-2/3">
                <h1 className="text-4xl font-medium md:text-6xl">
                  Be the Voice and Elevate Your Favorite Events with Eveny
                </h1>
                <p className="text-lg font-light text-zinc-400">
                  Embrace the Power of Your Voice. Join Eveny and Make an Impact
                  on Every Event!
                </p>
                <div>
                  <button className="btn btn-primary">
                    <Link href={"/register"}>Get started</Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
