import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';  // Updated import

export default function BudgetPlanning() {
  const [category, setCategory] = useState('Seeds');
  const [budgetAmount, setBudgetAmount] = useState('');
  const [recommendedAdjustments, setRecommendedAdjustments] = useState('Increase budget for Seeds');

  const handleBudgetUpdate = () => {
    // Validate if budgetAmount is empty or not a valid number
    if (!budgetAmount || isNaN(budgetAmount) || parseFloat(budgetAmount) <= 0) {
      Alert.alert('Invalid input', 'Please enter a valid budget amount greater than 0.');
      return;
    }

    // If category is not selected or is invalid (in this case it always has a default value)
    if (!category) {
      Alert.alert('Invalid input', 'Please select a valid category.');
      return;
    }

    // If everything is valid, update the budget (you can add backend logic here)
    console.log('Budget Updated:', category, budgetAmount);
    Alert.alert('Success', 'Budget has been updated successfully.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🗓️ 2025 Season Budget</Text>

      {/* Category Dropdown */}
      <View style={styles.pickContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Category:</Text>
          <Picker
            selectedValue={category}
            onValueChange={(itemValue) => setCategory(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="🌱 Seeds" value="Seeds" />
            <Picker.Item label="🛠️ Labor" value="Labor" />
            <Picker.Item label="⚙️ Equipment" value="Equipment" />
          </Picker>
        </View>

        {/* Budget Amount Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Budget Amount:</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Enter Amount"
            value={budgetAmount}
            onChangeText={setBudgetAmount}
          />
        </View>
      </View>

      {/* Update Budget Button */}
      <TouchableOpacity style={styles.updateButton} onPress={handleBudgetUpdate}>
        <Text style={styles.buttonText}>Update Budget</Text>
      </TouchableOpacity>

      {/* Recommended Budget Adjustments */}
      <View style={styles.recommendationsContainer}>
        <Text style={styles.recommendationTitle}>🔄 Recommended Budget Adjustments</Text>
        <Text style={styles.recommendationText}>{recommendedAdjustments}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F4F8F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2E7D32',
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    color: '#000',
    marginBottom: 10,
    fontWeight: '600',
  },
  picker: {
    height: 60,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    color: '#2E7D32',
    borderColor: '#4CAF50',
  },
  input: {
    borderWidth: 1,
    borderColor: '#4CAF50',
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    fontSize: 16,
  },
  updateButton: {
    backgroundColor: '#2E7D32',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  recommendationsContainer: {
    marginTop: 30,
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  pickContainer: {
    marginTop: 30,
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  recommendationTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 10,
  },
  recommendationText: {
    fontSize: 16,
    color: '#7F7F7F',
  },
});
