<<<<<<< HEAD
import hero from './../../public/hero-img.jpg'
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <Image src= {hero} alt='Hero-Image' className='max-w-screen rounded-lg shadow-2xl w-[32rem]'/>
        <div>
          <h1 className="text-5xl font-bold">Find Your Next Event!</h1>
          <p className="py-6">
            With Eveny. we'll help you find events that you like and the closest one to you!
          </p>
          <button className="btn btn-success"><Link href="/events">Get Started!</Link></button>
        </div>
      </div>
    </div>
=======
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
>>>>>>> a7fdafb7b45727acf23ad20f1b8a22197d740f14
  );
}
