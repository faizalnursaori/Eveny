import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import Explanation from "@/components/Explanation";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <section>
        <Hero/>
      </section>
      <section>
        <div className="divider divider-success">Explore Meaningful Oportunities</div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
        </div>
        <div className="w-full flex justify-center my-2">
        <button className="btn btn-success"><Link href="/events">More Events</Link></button>
        </div>
      </section>
      <section className="mb-3">
        <div className="divider divider-success">How Eveny Works?</div>
        <Explanation/>
      </section>
    </main>
  );
}
