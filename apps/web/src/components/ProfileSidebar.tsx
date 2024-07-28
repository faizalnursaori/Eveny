
  import { Button } from "./ui/button";
  import Link from "next/link";
  import { Calendar, ArrowLeftRight, House } from "lucide-react";
  
  export default function ProfileSidebar() {
    return (
      <ul className="menu menu-vertical px-1 text-lg font-medium" >
        <li><Link className="flex flex-row font-semibold gap-2 py-2 ml-2 my-1" href='/profile'><House/>Profile</Link></li>
        <li><Link className="flex flex-row font-semibold gap-2 py-2 ml-2 my-1" href='/profile/events'><Calendar/>Events</Link></li>
        <li><Link className="flex flex-row font-semibold gap-2 py-2 ml-2 my-1" href='/profile/transactions'><ArrowLeftRight/>Transactions</Link></li>
      </ul>
  
    );
  }
  