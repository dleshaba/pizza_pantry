import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { updateItem } from "../services/ItemsService";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";

type Props = NativeStackScreenProps<RootStackParamList, "EditItem">;

const EditItemScreen = ({ route, navigation }: Props) => {
  // ✅ Safe item destructuring from route.params
  const item = route?.params?.item;

  if (!item) {
    return (
      <View style={styles.centered}>
        <Text>No item selected for editing.</Text>
      </View>
    );
  }

  const [name, setName] = useState(item.name);
  const [category, setCategory] = useState(item.category);
  const [quantity, setQuantity] = useState(String(item.quantity));
  const [reorderThreshold, setReorderThreshold] = useState(
    String(item.reorderThreshold)
  );
  const [costPrice, setCostPrice] = useState(String(item.costPrice));
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    if (!name || !category || !quantity || !reorderThreshold) {
      Alert.alert("Validation Error", "Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      const userToken = await AsyncStorage.getItem("token");

      if (!userToken) {
        Alert.alert("Error", "User not authenticated.");
        return;
      }

      const decoded = JSON.parse(atob(userToken.split(".")[1]));
      const updatedBy = decoded?.id || "unknown";

      const updatedItem = {
        ...item,
        name,
        category,
        quantity: parseInt(quantity, 10),
        reorderThreshold: parseInt(reorderThreshold, 10),
        costPrice: parseFloat(costPrice),
        updatedBy,
      };

      await updateItem(item._id, updatedItem);

      Alert.alert("Success", "Item updated successfully!");
      navigation.navigate("EditItem", { item, refresh: loadItems }); 
    } catch (err: any) {
      console.error("Error updating item:", err.message);
      Alert.alert("Error", "Failed to update item.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Edit Item</Text>

      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <TextInput
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
        style={styles.input}
      />

      <TextInput
        placeholder="Quantity"
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
        style={styles.input}
      />

      <TextInput
        placeholder="Reorder Threshold"
        value={reorderThreshold}
        onChangeText={setReorderThreshold}
        keyboardType="numeric"
        style={styles.input}
      />

      <TextInput
        placeholder="Cost Price"
        value={costPrice}
        onChangeText={setCostPrice}
        keyboardType="decimal-pad"
        style={styles.input}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#32CD32" />
      ) : (
        <Button title="Update Item" onPress={handleUpdate} color="#32CD32" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
  },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default EditItemScreen;
function loadItems(): Promise<void> {
    throw new Error("Function not implemented.");
}

