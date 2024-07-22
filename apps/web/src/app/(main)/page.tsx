import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import Explanation from "@/components/Explanation";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <section>
        <Hero />
      </section>
      <div className="flex items-center justify-between p-12">
        <div className="text-3xl font-light">Events for you</div>
      </div>
      <section className="mx-4 grid grid-cols-3 gap-8 pb-8">
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </section>
      <div className="flex items-center justify-between p-12">
        <div className="text-3xl font-light">
          <p>How eveny works?</p>
        </div>
      </div>
      <section className="flex justify-center">
        <Explanation />
      </section>
    </main>
  );
}
