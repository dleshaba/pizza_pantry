// import React from "react";
// import { View, Text, Button } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { NativeStackScreenProps } from "@react-navigation/native-stack";
// import { RootStackParamList } from "../../App";

// type Props = NativeStackScreenProps<RootStackParamList, "Home">;

// export default function HomeScreen({ navigation }: Props) {
//   const logout = async () => {
//     await AsyncStorage.removeItem("token");
//     navigation.replace("Login");
//   };

//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Text>Welcome to Pizza Pantry 🍕</Text>
//       <Button title="Logout" onPress={logout} />
//     </View>
//   );
// }
