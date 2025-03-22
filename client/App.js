import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Dashboard from "./pages/dashboard";
import DistributorForm from "./pages/add_distributor";
import UpdateDistributor from "./pages/update_distributor"; // Correct import for update page

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Dashboard">
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Add Distributor" component={DistributorForm} />
        <Stack.Screen name="Update Distributor" component={UpdateDistributor} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
