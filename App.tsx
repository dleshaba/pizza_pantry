import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import InventoryListScreen from "./src/screens/InventoryListScreen"; // you can make a placeholder

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  InventoryList: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen
          name="InventoryList"
          component={InventoryListScreen}
          options={{ title: "Inventory" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
