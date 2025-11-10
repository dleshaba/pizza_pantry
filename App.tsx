import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import InventoryListScreen from "./src/screens/InventoryListScreen";
import AddItemScreen  from "./src/screens/AddItemScreen";
import EditItemScreen from "./src/screens/EditItemScreen";
import { RootStackParamList } from "./types";

// export type RootStackParamList = {
//   Login: undefined;
//   Register: undefined;
//   InventoryList: undefined;
// };

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
        
         <Stack.Screen name="AddItem" component={AddItemScreen} />
         <Stack.Screen name="EditItem" component={EditItemScreen} options={{ title: "Edit Item" }} />

      </Stack.Navigator>
      
      
    </NavigationContainer>
  );
}
