import axios from "axios";

const base_api = "http://localhost:8000/api"

export const getEvents = async () => {
    const res = await axios.get(`${base_api}/events`)
    return res;
}

export const getEvent = async () => {
    const res = await axios.get(`${base_api}/api/events/:slug`)
    return res;
}
