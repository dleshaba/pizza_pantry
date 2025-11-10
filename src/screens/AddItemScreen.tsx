import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import { createItem } from "../services/ItemsService";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AddItemScreen = ({ navigation, route }: any) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [unit, setUnit] = useState("");
  const [quantity, setQuantity] = useState("");
  const [reorderThreshold, setReorderThreshold] = useState("");
  const [costPrice, setCostPrice] = useState("");

  const handleAdd = async () => {
    try {
      const userToken = (await AsyncStorage.getItem("token"))!;
      const decoded = JSON.parse(atob(userToken.split(".")[1]));
      const createdBy = decoded?.id || "unknown";

      const newItem = {
        name,
        category,
        unit,
        quantity: Number(quantity),
        reorderThreshold: Number(reorderThreshold),
        costPrice: Number(costPrice),
        createdBy,
      };

      const data = await createItem(newItem);
      Alert.alert("✅ Item added successfully!");

      // If callback was passed, update the list in real-time
      if (route.params?.onAddItem) {
        route.params.onAddItem(data);
      }

      navigation.goBack();
    } catch (error: any) {
      console.error(error);
      Alert.alert("❌ Failed to add item", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add New Item</Text>
      <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input} />
      <TextInput placeholder="Category" value={category} onChangeText={setCategory} style={styles.input} />
      <TextInput placeholder="Unit (e.g., kg, box)" value={unit} onChangeText={setUnit} style={styles.input} />
      <TextInput placeholder="Quantity" keyboardType="numeric" value={quantity} onChangeText={setQuantity} style={styles.input} />
      <TextInput placeholder="Reorder Threshold" keyboardType="numeric" value={reorderThreshold} onChangeText={setReorderThreshold} style={styles.input} />
      <TextInput placeholder="Cost Price" keyboardType="numeric" value={costPrice} onChangeText={setCostPrice} style={styles.input} />
      <Button title="Add Item" color="#32CD32" onPress={handleAdd} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "white" },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
});

export default AddItemScreen;
