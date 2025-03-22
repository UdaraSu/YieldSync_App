import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ExpenseScreen from './pages/AddExpenseScreen';
import FinancialDashboard from './pages/FinancialDashboard';
import BudgetPlanning from './pages/BudgetPlanning';
import FinancialReports from './pages/FinancialReports';
import AddExpenseScreen from './pages/AddExpenseScreen';  // AddExpenseScreen file
import UpdateExpenseScreen from './pages/UpdateExpenseScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="FinancialDashboard">
        <Stack.Screen name="FinancialDashboard" component={FinancialDashboard} />
        <Stack.Screen name="AddExpenseScreen" component={AddExpenseScreen} />
        <Stack.Screen name="UpdateExpenseScreen" component={UpdateExpenseScreen} />
        <Stack.Screen name="BudgetPlanning" component={BudgetPlanning} />
        <Stack.Screen name="FinancialReports" component={FinancialReports} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
