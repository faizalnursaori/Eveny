import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import Link from "next/link";
import { Calendar, ArrowLeftRight, House } from "lucide-react";

export default function Sidebar() {
  return (
    <Command className="h-[100vh] text-white">
      <CommandInput placeholder="Search" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Dashboard">
          <CommandItem className="flex gap-2">
            <House />
            <Link href="/dashboard">Dashboard</Link>
          </CommandItem>
          <CommandItem className="flex gap-2">
            <Calendar />
            <Link href="/dashboard/events">Events</Link>
          </CommandItem>
          <CommandItem className="flex gap-2">
            <ArrowLeftRight />
            <Link href="/dashbard/transaction">Transaction</Link>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
