import React, { useState } from "react";
import { View, TextInput, Button, Text, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import { loginUser } from "../services/AuthService";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Validation Error", "Please enter email and password");
      return;
    }

    try {
      setLoading(true);
      const data = await loginUser(email, password);
      console.log("Login response:", data); // debug
      await AsyncStorage.setItem("token", data.token);
      Alert.alert("Login Successful", `Welcome ${data.user.name}`);
      navigation.navigate("InventoryList");
    } catch (err: any) {
      console.log("Login error:", err.response?.data || err.message);
      Alert.alert("Login Failed", err.response?.data?.message || err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Text style={{ fontSize: 22, textAlign: "center", marginBottom: 20 }}>Login</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={{ borderWidth: 1, borderRadius: 8, marginBottom: 10, padding: 10 }}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{ borderWidth: 1, borderRadius: 8, marginBottom: 10, padding: 10 }}
      />
      <Button title={loading ? "Logging in..." : "Login"} onPress={handleLogin} />
      <Text
        style={{ textAlign: "center", marginTop: 15, color: "blue" }}
        onPress={() => navigation.navigate("Register")}
      >
        Don't have an account? Register
      </Text>
    </View>
  );
}
