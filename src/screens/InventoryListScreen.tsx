import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  TextInput,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import { getItems } from "../services/itemsService";

type Props = NativeStackScreenProps<RootStackParamList, "InventoryList">;

interface Item {
  _id: string;
  name: string;
  category: string;
  quantity: number;
  reorderThreshold: number;
}

const InventoryListScreen = ({ navigation }: Props) => {
  const [items, setItems] = useState<Item[]>([]);
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filterLowStock, setFilterLowStock] = useState(false);

  const loadItems = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getItems();
      setItems(data);
      setFilteredItems(data);
    } catch (err: any) {
      console.error("Error fetching items:", err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadItems();
    setRefreshing(false);
  };

  useEffect(() => {
    let filtered = items.filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (filterLowStock) {
      filtered = filtered.filter((item) => item.quantity <= item.reorderThreshold);
    }

    setFilteredItems(filtered);
  }, [searchQuery, filterLowStock, items]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#32CD32" />
        <Text>Loading inventory...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search items..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.searchInput}
      />

      <View style={styles.filterRow}>
        <TouchableOpacity
          style={[styles.filterButton, filterLowStock && styles.filterButtonActive]}
          onPress={() => setFilterLowStock(!filterLowStock)}
        >
          <Text style={{ color: filterLowStock ? "white" : "black" }}>Low Stock</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("AddItem")}
        >
          <Text style={styles.addButtonText}>Add Item</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item._id || Math.random().toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.itemCard}
            onPress={() => navigation.navigate("ItemDetail", { item })}
          >
            <Text style={styles.itemName}>{item.name}</Text>
            <Text>Category: {item.category}</Text>
            <Text>Quantity: {item.quantity}</Text>
            <Text>Reorder: {item.reorderThreshold}</Text>
          </TouchableOpacity>
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListEmptyComponent={<Text style={styles.empty}>No items found.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "white" },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  filterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  filterButton: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#32CD32",
  },
  filterButtonActive: {
    backgroundColor: "#32CD32",
  },
  addButton: {
    backgroundColor: "#32CD32",
    padding: 10,
    borderRadius: 8,
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  itemCard: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  itemName: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },
  empty: { textAlign: "center", marginTop: 20, color: "#777" },
});

export default InventoryListScreen;
