import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
//import InventoryListScreen from "../screens/InventoryListScreen";

const Stack = createNativeStackNavigator();


export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  InventoryList: undefined;
};