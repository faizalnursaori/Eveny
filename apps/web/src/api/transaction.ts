import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";



const base_api = "htpp://localhost:8000/api";
const router = useRouter()


export const createTransaction = async (data : {}) => {
    try {
        const res = await axios.post(`${base_api}/transactions`, data)
        toast('Transaction in progress')
        router.push('/profile/transaction')
    } catch (error) {
        console.log(error);
        
    }
}

export const getTransaction = async () => {
  try {
    const res = await axios.get(`${base_api}/transactions`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
