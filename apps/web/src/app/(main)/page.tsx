import Hero from "@/components/Hero";
import EventCard from "@/components/EventCard";
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
        <EventCard
          slug={""}
          title="New movie is released!"
          description="Click the button to watch on Jetflix app."
          imageUrl={
            "https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
          }
          location="Jakarta"
          date={new Date().toLocaleDateString()}
          organizer="Organizer"
        />
        <EventCard
          slug={""}
          title="New movie is released!"
          description="Click the button to watch on Jetflix app."
          imageUrl={
            "https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
          }
          location="Jakarta"
          date={new Date().toLocaleDateString()}
          organizer="Organizer"
        />
        <EventCard
          slug={""}
          title="New movie is released!"
          description="Click the button to watch on Jetflix app."
          imageUrl={
            "https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
          }
          location="Jakarta"
          date={new Date().toLocaleDateString()}
          organizer="Organizer"
        />
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
