import { Button } from "./ui/button";
import Link from "next/link";
import { Calendar, ArrowLeftRight, House } from "lucide-react";

export default function ProfileSidebar() {
  return (
    <ul className="menu menu-vertical px-1 text-lg font-medium">
      <li>
        <Link
          className="my-1 ml-2 flex flex-row gap-2 py-2 font-semibold"
          href="/dashboard"
        >
          <House />
          Dashboard
        </Link>
      </li>
      <li>
        <Link
          className="my-1 ml-2 flex flex-row gap-2 py-2 font-semibold"
          href="/profile/events"
        >
          <Calendar />
          Events
        </Link>
      </li>
      <li>
        <Link
          className="my-1 ml-2 flex flex-row gap-2 py-2 font-semibold"
          href="/profile/transactions"
        >
          <ArrowLeftRight />
          Transactions
        </Link>
      </li>
    </ul>
  );
}
