import axios from "axios";

const fetchEvents = async () => {
  try {
    const res = axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/`);
  } catch (error) {}
};

export default function Events() {
  return <div></div>;
}
