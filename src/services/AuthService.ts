import axios from "axios";

const API_URL = "http://127.0.0.1:5000/api/auth";

interface LoginResponse {
  token: string;
  user: {
    name: string;
    email: string;
    _id: string;
  };
}

export const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
  const res = await axios.post(`${API_URL}/login`, { email, password });
  return res.data;
};

export const registerUser = async (name: string, email: string, password: string): Promise<LoginResponse> => {
  const res = await axios.post(`${API_URL}/register`, { name, email, password });
  return res.data;
};
