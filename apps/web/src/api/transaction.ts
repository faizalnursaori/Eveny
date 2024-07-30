import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";



const base_api = "htpp://localhost:8000/api";



export const createTransaction = async (data : {}) => {
  const router = useRouter()
    try {
        const res = await axios.post(`${base_api}/transactions`, data)
        toast('Transaction in progress')
        router.push('/profile/transaction')
    } catch (error) {
        console.log(error);
        
    }
}

export const getTransaction = async () => {
  const router = useRouter()
  try {
    const res = await axios.get(`${base_api}/transactions`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
