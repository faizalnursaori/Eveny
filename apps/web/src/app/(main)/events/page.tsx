"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { getEvents } from "@/api/event"
import ProductCard from "@/components/ProductCard"

export default function Events(){
    const [events, setEvents] = useState({})

    useEffect(() => {
        setEvents(getEvents())
    }, [])

    return(
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center">
          
        </div>
    )
}

