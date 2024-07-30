import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function About() {
  return (
    <div className="p-6">
      <div>
        <h1 className=" text-center text-3xl font-bold">About</h1>
        <p>
          Welcome to <span className="font-bold">
                Eveny<span className="text-orange-500">.</span>
              </span>{" "} - where your vision transforms into unforgettable
          experiences! At <span className="font-bold">
                Eveny<span className="text-orange-500">.</span>
              </span>{" "} we're passionate about creating moments that
          matter. As a premier event management platform, we bring together
          innovation, creativity, and meticulous planning to deliver events that
          exceed expectations and create lasting memories.
        </p>
      </div>
      <div>
        <Accordion type="single" collapsible className="">
          <AccordionItem value="item-1">
            <AccordionTrigger>Our Mission</AccordionTrigger>
            <AccordionContent>
              Our mission is simple: to make event planning seamless, enjoyable,
              and extraordinary. Whether you're hosting an intimate gathering or
              a grand celebration, our goal is to take the stress out of
              organizing and let you focus on enjoying the occasion. From
              conceptualization to execution, we handle every detail with
              precision and flair.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>What we do</AccordionTrigger>
            <AccordionContent>
              <span className="font-bold">
                Eveny<span className="text-orange-500">.</span>
              </span>{" "}
              offers a comprehensive suite of event management services designed
              to cater to your unique needs. Our platform features:
              <ul className="list-disc pl-6">
                <li>
                  Customizable Event Planning Tools: Create and manage your
                  event with ease using our intuitive tools and resources.
                  Tailor every aspect to reflect your style and preferences
                </li>
                <li>
                  Seamless Coordination: Enjoy a stress-free planning experience
                  with our streamlined coordination services, ensuring that
                  every detail is handled smoothly and efficiently.
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Join Us</AccordionTrigger>
            <AccordionContent>
              Ready to turn your next event into something truly special?
              Explore Eveny and discover how we can make your vision a reality.
              Contact us today to start planning an unforgettable experience! At
              Eveny, we don't just manage events - we create memories. Let us
              help you make yours extraordinary.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
