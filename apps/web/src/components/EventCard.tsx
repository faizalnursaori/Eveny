import Link from "next/link";
import Image from "next/image";
import { EventCardProps } from "@/utils/types/types";

const EventCard: React.FC<EventCardProps> = ({
  slug,
  title,
  imageUrl,
  location,
  date,
  organizer,
  price,
}) => {
  const baseUrl = "http://localhost:8000";
  const fullImageUrl = imageUrl ? `${baseUrl}${imageUrl}` : "/placeholder.jpg";

  return (
    <div className="card w-64 bg-base-200 shadow-md transition-shadow duration-300 hover:bg-base-100">
      <Link href={`/events/${slug}`}>
        <figure className="relative pt-[56.25%]">
          <Image
            src={fullImageUrl || "/200x200.png"}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
          />
        </figure>
        <div className="card-body p-3">
          <h2 className="card-title text-base font-semibold">{title}</h2>
          <p className="flex items-center text-xs">{organizer}</p>
          <div className="mt-2 space-y-0.5">
            <p className="flex items-center text-xs">
              {new Date(date).toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
            <p className="flex items-center text-xs">{location}</p>
          </div>
          <p className="text-sm font-medium">
            {typeof price === "number"
              ? price.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })
              : price}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default EventCard;
