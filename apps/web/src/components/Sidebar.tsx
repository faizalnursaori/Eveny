import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { Button } from "./ui/button";
import Link from "next/link";
import { Calendar, ArrowLeftRight, House, UserCog } from "lucide-react";

export default function Sidebar() {
  return (
    <ul className="menu menu-vertical px-1 text-lg font-medium">
      <li>
        <Link
          className="my-1 ml-2 flex flex-row gap-2 py-2 font-semibold"
          href="/profile"
        >
          <UserCog /> Profile
        </Link>
      </li>
      <li>
        <Link
          className="my-1 ml-2 flex flex-row gap-2 py-2 font-semibold"
          href="/dashboard/events"
        >
          <Calendar /> Events
        </Link>
      </li>
      <li>
        <Link
          className="my-1 ml-2 flex flex-row gap-2 py-2 font-semibold"
          href="/dashboard/transactions"
        >
          <ArrowLeftRight /> Transactions
        </Link>
      </li>
    </ul>
  );
}
