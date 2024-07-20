import axios from "axios";

const base_api = "http://localhost:8000/api"

export async function getEvents(){
    const res = await axios.get(`${base_api}/events`)
    return res;
}

export async function getEvent(){
    const res = await axios.get(`${base_api}/api/events/:id`)
}