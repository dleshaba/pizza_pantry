import React, { useState } from "react";
import { View, TextInput, Button, Text, Alert } from "react-native";
import axios from "axios";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";


type Props = NativeStackScreenProps<RootStackParamList, "Register">;

export default function RegisterScreen({ navigation }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!email || !password) return Alert.alert("Please fill in all fields");

    try {
      await axios.post("http://127.0.0.1:5000/api/register", { email, password });
      Alert.alert("Success", "Account created!");
      navigation.navigate("Login");
    } catch (err) {
      Alert.alert("Error", "Registration failed");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Text style={{ fontSize: 22, textAlign: "center", marginBottom: 20 }}>Register</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, borderRadius: 8, marginBottom: 10, padding: 10 }}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{ borderWidth: 1, borderRadius: 8, marginBottom: 10, padding: 10 }}
      />
      <Button title="Register" onPress={handleRegister} />
      <Text
        style={{ textAlign: "center", marginTop: 15, color: "blue" }}
        onPress={() => navigation.navigate("Login")}
      >
        Already have an account? Login
      </Text>
    </View>
  );
}
