import Link from "next/link";
import { EventCardProps } from "@/utils/types/types";
import Image from "next/image";

const EventCard: React.FC<EventCardProps> = ({
  slug,
  title,
  description,
  imageUrl,
  location,
  date,
  organizer,
}) => {
  return (
    <div>
      <Link href={`/events/${slug}`} className="block">
        <div className="card rounded-none bg-base-300 shadow-xl transition-colors lg:card-side hover:bg-base-200">
          <figure className="mx-3 my-3 pl-1">
            <Image
              src={imageUrl || "/200x200.png"}
              alt={title}
              width={200}
              height={200}
              className="h-auto w-full rounded-lg object-cover"
            />
          </figure>
          <div className="card-body flex flex-col justify-between">
            <div>
              <h2 className="card-title mb-2">{title}</h2>
              <p className="mb-1">{description}</p>
              <p className="mb-1 text-sm text-gray-600">By {organizer}</p>
            </div>
            <div className="text-sm">
              <div className="flex items-center gap-1 text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-map-pin"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <p className="text-gray-600">{location}</p>
                <span className="text-gray-600">{date}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default EventCard;
