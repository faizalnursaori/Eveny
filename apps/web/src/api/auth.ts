import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const base_api = "http://localhost:8000/auth";

export const handleRegister = async (data: {}) => {
  const router = useRouter();
  try {
    const res = await axios.post(`${base_api}/register`, data);

    router.push("/login");
    toast.success("Account Created!");
  } catch (error) {
    console.error(error);
  }
};

export const handleLogin = async (data: {}) => {
  const router = useRouter();
  try {
    const res = await axios.post(`${base_api}/login`, data);

    toast.success("Login success!");
    router.push("/");
  } catch (error) {
    console.error(error);
  }
};

export const getUser = async (id: number) => {
  const token = localStorage.getItem("token");
  const res: any = await axios.get(`${base_api}/user/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.user;
};

export const editUser = async (id: number, data: {}) => {
  const token = localStorage.getItem("token");
  const res = await axios.put(`${base_api}/user/${id}`, data, {
    headers: {Authorization: `Bearer ${token}`}
  })
  toast.success("user updated!");
}
