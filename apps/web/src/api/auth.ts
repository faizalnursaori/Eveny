import axios from "axios";

const base_api = "http://localhost:8000/api"


export default async function postRegist(){
    const res = await axios.post(`${base_api}/register`, {
        
    })
}