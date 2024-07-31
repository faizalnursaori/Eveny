import axios from "axios";
import toast from "react-hot-toast";

const base_api = "http://localhost:8000/api"
const token = localStorage.getItem("token");

export const getEvents = async () => {
    const res = await axios.get(`${base_api}/events`)
    return res;
}

export const getEvent = async () => {
    const res = await axios.get(`${base_api}/api/events/:slug`)
    return res;
}

export const deleteEvent = async (id: number) => {
    const res = await axios.delete(`${base_api}/events/${id}`, {
        headers: {Authorization: `Bearer ${token}`}
    })
    toast('Event Deleted!')
}

export const editEvent = async (id: number, data: {}) => {
    const res = await axios.put(`${base_api}/events/${id}`,data, {
        headers: {Authorization: `Bearer ${token}`}
    })
    toast('Event Updated!')
}
