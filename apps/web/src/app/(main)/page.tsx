import Hero from "@/components/Hero";
import EventCard from "@/components/EventCard";
import Explanation from "@/components/Explanation";
import Link from "next/link";

export default function Home() {
  return (
    <main className="container mx-auto px-4">
      <section className="mb-16">
        <Hero />
      </section>

      <section className="mb-16">
        <h2 className="mb-8 text-3xl font-light">Events for you</h2>
        <div className="mx-auto grid grid-cols-1 gap-[14rem] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {[...Array(5)].map((_, index) => (
            <EventCard
              key={index}
              slug={""}
              title="New movie is released!"
              imageUrl={"/200x200.png"}
              location="Jakarta"
              date={new Date().toLocaleDateString()}
              organizer="Organizer"
              price={100000}
            />
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="mb-8 text-3xl font-light">How eveny works?</h2>
        <div className="flex justify-center">
          <Explanation />
        </div>
      </section>
    </main>
  );
}
