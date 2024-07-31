import { FormData } from "@/components/Login";
import axios from "axios";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
export const loginAPI = async (formData: FormData) => {
  try {
    const res = await axios.post(`${backendUrl}/user/login`, formData);
    return res.data.data;
  } catch (error) {
    alert(error);
    throw error;
  }
};

export const signinAPI = async (formData: {
  fullName: string;
  email: string;
  password: string;
}) => {
  try {
    const res = await axios.post(`${backendUrl}/user/signUp`, formData);
    return res.data.data;
  } catch (error) {
    console.error("API call failed:", error);
  }
};

export const getUser = async () => {
  try {
    const res = await axios.get(`${backendUrl}/user/getUser`, {
      headers: { todo: localStorage.getItem("token") },
    });
    return res.data.data;
  } catch (error) {
    console.error("API call failed:", error);
  }
};
