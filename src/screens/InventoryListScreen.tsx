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
  Alert,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import { getItems, deleteItem } from "../services/ItemsService";

type Props = NativeStackScreenProps<RootStackParamList, "InventoryList">;

interface Item {
  _id: string;
  name: string;
  category: string;
  unit: string;
  quantity: number;
  reorderThreshold: number;
  costPrice: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
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

  // Search + low stock filter
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

  const handleDelete = (id: string) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this item?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteItem(id);
              Alert.alert("Deleted", "Item deleted successfully.");
              await loadItems(); // refresh list automatically
            } catch (err: any) {
              Alert.alert("Error", err.response?.data?.message || err.message);
            }
          },
        },
      ]
    );
  };

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
          onPress={() => navigation.navigate("AddItem", { refresh: loadItems })}
        >
          <Text style={styles.addButtonText}>Add Item</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.itemCard}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text>Category: {item.category}</Text>
            <Text>Quantity: {item.quantity}</Text>
            <Text>Unit: {item.unit}</Text>
            <Text>Reorder: {item.reorderThreshold}</Text>
            <Text>Cost: {item.costPrice}</Text>

            <View style={styles.actionRow}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => navigation.navigate("EditItem", { item, refresh: loadItems })}
              >
                <Text style={styles.editButtonText}>Edit</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDelete(item._id)}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
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
  actionRow: { flexDirection: "row", justifyContent: "flex-end", marginTop: 10 },
  editButton: {
    backgroundColor: "#FFA500",
    padding: 8,
    borderRadius: 5,
    marginRight: 10,
  },
  editButtonText: { color: "white", fontWeight: "bold" },
  deleteButton: {
    backgroundColor: "#FF3333",
    padding: 8,
    borderRadius: 5,
  },
  deleteButtonText: { color: "white", fontWeight: "bold" },
  empty: { textAlign: "center", marginTop: 20, color: "#777" },
});

export default InventoryListScreen;
