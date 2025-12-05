import api from "./api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getAuthHeaders = async () => {
  const token = await AsyncStorage.getItem("token");
  return { Authorization: `Bearer ${token}` };
};

export const getItems = async () => {
  const headers = await getAuthHeaders();
  const res = await api.get("/items", { headers });
  return res.data;
};

export const createItem = async (item: any) => {
  const headers = await getAuthHeaders();
  const res = await api.post("/items", item, { headers });
  return res.data;
};

export const updateItem = async (id: string, item: any) => {
  const headers = await getAuthHeaders();
  const res = await api.put(`/items/${id}`, item, { headers });
  return res.data;
};

// export const deleteItem = async (id: string) => {
//   const headers = await getAuthHeaders();
//   const res = await api.delete(`/items/${id}`, { headers });
//   return res.data;
// };

export const deleteItem = async (id: string) => {
  const token = await AsyncStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };
  const res = await api.delete(`/items/${id}`, { headers });
  return res.data;
};


export const adjustQuantity = async (id: string, delta: number, reason: string) => {
  const headers = await getAuthHeaders();
  const res = await api.post(`/items/${id}/adjust`, { delta, reason }, { headers });
  return res.data;
};

// export const updateItem = async (id: string, updatedItem: any, token: string) => {
//   const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/items/${id}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify(updatedItem),
//   });

//   if (!response.ok) {
//     throw new Error("Failed to update item");
//   }

//   return await response.json();
// };

