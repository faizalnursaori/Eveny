import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut
} from "@/components/ui/command";
import { Button } from "./ui/button";
import Link from "next/link";
import { Calendar, ArrowLeftRight, House } from "lucide-react";

export default function Sidebar() {
  return (
    <ul className="menu menu-vertical px-1 text-lg font-medium" >
      <li><Link className="flex flex-row font-semibold gap-2 py-2 ml-2 my-1" href='/dashboard'><House/> Dashboard</Link></li>
      <li><Link className="flex flex-row font-semibold gap-2 py-2 ml-2 my-1" href='/dashboard/events'><Calendar/> Events</Link></li>
      <li><Link className="flex flex-row font-semibold gap-2 py-2 ml-2 my-1" href='/dashboard/transactions'><ArrowLeftRight/> Transactions</Link></li>
    </ul>

  );
}
