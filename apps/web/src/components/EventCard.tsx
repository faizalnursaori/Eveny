import Link from "next/link";
import Image from "next/image";
import { EventCardProps } from "@/utils/types/types";
import {
  getFullImageUrl,
  formatDate,
  formatPrice,
  convertToNumber,
} from "@/utils/helper/eventCardHelper";
import { Calendar, MapPin, User, Tag } from "lucide-react"; // Import Lucide icons

const EventCard: React.FC<EventCardProps> = ({
  slug,
  title,
  imageUrl,
  location,
  date,
  organizer,
  price,
  isFree,
}) => {
  const fullImageUrl = getFullImageUrl(imageUrl);
  const priceAsNumber = convertToNumber(price);

  return (
    <Link href={`/events/${slug}`} className="group">
      <div className="overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
        <div className="relative h-48 w-full">
          <Image
            src={fullImageUrl}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
            <h2 className="line-clamp-2 text-lg font-bold text-white">
              {title}
            </h2>
          </div>
        </div>
        <div className="p-4">
          <div className="mb-3 flex items-center text-sm text-gray-600">
            <User className="mr-2 h-4 w-4" />
            <span className="line-clamp-1">{organizer}</span>
          </div>
          <div className="mb-2 flex items-center text-sm text-gray-600">
            <Calendar className="mr-2 h-4 w-4" />
            <span>{formatDate(date)}</span>
          </div>
          <div className="mb-3 flex items-center text-sm text-gray-600">
            <MapPin className="mr-2 h-4 w-4" />
            <span className="line-clamp-1">{location}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center text-sm font-medium text-blue-600">
              <Tag className="mr-1 h-4 w-4" />
              {formatPrice(priceAsNumber, isFree)}
            </span>
            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800">
              {isFree ? "Free" : "Paid"}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
