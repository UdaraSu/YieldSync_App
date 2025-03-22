import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import Home from './pages/Startup';
import OrganicFertilizerHome from './pages/OrganicFertilizerHome';
import SoilWeatherChecker from './pages/SoilWeatherChecker';
import FertilizerCalculator from './pages/generater';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator initialRouteName="startup"
      >
        <Stack.Screen name="startup" component={Home} />
        <Stack.Screen name="OrganicFertilizer" component={OrganicFertilizerHome}/>
        <Stack.Screen name="SoilWeather" component={SoilWeatherChecker} />
        <Stack.Screen name="generater" component={FertilizerCalculator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}