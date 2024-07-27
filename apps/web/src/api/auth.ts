import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { cookies } from "next/headers";


const router = useRouter()
const base_api_url = 'http://localhost:8000/api'

export const handleRegister = async (data : {}) => {
    try {
        const res = await axios.post(`${base_api_url}/register`, data);
  
        router.push("/login");
        toast.success("Account Created!");
      } catch (error) {
        console.error(error);
      }
}

export const handleLogin = async (data : {}) => {
    try {
        const res = await axios.post(`${base_api_url}/login`, data );

        cookies().set("token", res.data.token)
        toast.success("Login success!");
        router.push('/')
      } catch (error) {
        console.error(error);
      }
}

export const logoutProcess = async () => {
    cookies().delete('token')
    router.push('/login')
}