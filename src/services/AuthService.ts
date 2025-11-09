import api from "./api";

export const registerUser = async (email: string, password: string, name: string) => {
  const res = await api.post("/auth/register", { email, password, name });
  return res.data;
};

export const loginUser = async (email: string, password: string) => {
  const res = await api.post("/auth/login", { email, password });
  return res.data;
};
