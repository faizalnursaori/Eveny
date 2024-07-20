"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { getEvents } from "@/api/event"

export default function Events(){
    const [events, setEvents] = useState([])

    useEffect(()=> {

    }, [])

    const  handleGetEvents = async () =>{
        const events = await getEvents()
        setEvents(events.data)
    }

    return(
        <div className="">
            
        </div>
    )
}

