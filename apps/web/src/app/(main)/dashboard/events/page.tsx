import axios from "axios"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  



async function getEvent(){
    const res = axios.get('http://localhost:8000/api/events')
    return res
}
  


export default function DashboardTransactions() {
    const data = getEvent()
    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Event Title</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Event Start</TableHead>
                        <TableHead>Event End</TableHead>
                        <TableHead>Available Seats</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>Summer Festivals</TableCell>
                        <TableCell>120.000</TableCell>
                        <TableCell>Festivals</TableCell>
                        <TableCell>Jakarta</TableCell>
                        <TableCell>-</TableCell>
                        <TableCell>-</TableCell>
                        <TableCell>10</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    )
}