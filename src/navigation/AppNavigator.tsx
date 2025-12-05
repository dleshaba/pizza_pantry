import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";


const Stack = createNativeStackNavigator();


export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  InventoryList: undefined;
  AddItem: undefined;
  EditItem: { item: any; refresh?: () => Promise<void> };
  ItemDetail: { item: any };
};
