import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { createItem } from "../services/itemsService";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";

type Props = NativeStackScreenProps<RootStackParamList, "AddItem">;

const AddItemScreen = ({ navigation }: Props) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [reorderThreshold, setReorderThreshold] = useState("");

  const handleAddItem = async () => {
    if (!name || !category || !quantity || !reorderThreshold) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    try {
      await createItem({
        name,
        category,
        quantity: parseInt(quantity),
        reorderThreshold: parseInt(reorderThreshold),
      });
      Alert.alert("Success", "Item added!");
      navigation.goBack();
    } catch (err: any) {
      Alert.alert("Error", err.message || "Failed to add item");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Item</Text>
      <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input} />
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
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Reorder Threshold"
        value={reorderThreshold}
        onChangeText={setReorderThreshold}
        style={styles.input}
        keyboardType="numeric"
      />
      <Button title="Add Item" onPress={handleAddItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "white" },
  title: { fontSize: 24, marginBottom: 20 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 10, borderRadius: 8 },
});

export default AddItemScreen;
