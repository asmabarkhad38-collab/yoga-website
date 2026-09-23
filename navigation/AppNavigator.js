import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import BottomTabNavigator from "./BottomTabNavigator";
import FoodDetailsScreen from "../screens/FoodDetailsScreen";


const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen
          name="Login"
          component={LoginScreen}
        />

        <Stack.Screen
          name="Register"
          component={RegisterScreen}
        />
        
       <Stack.Screen
  name="Main"
  component={BottomTabNavigator}
  options={{ headerShown: false }}
/>
<Stack.Screen
  name="FoodDetails"
  component={FoodDetailsScreen}
/>
      </Stack.Navigator>
    </NavigationContainer>
  );
  
}