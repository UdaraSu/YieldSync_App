import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Alert, LogBox } from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

const API_URL = "http://192.168.179.92:5000/api/budget";

// Suppress React Native logs warning
LogBox.ignoreLogs([
  "JavaScript logs will be removed from Metro in React Native 0.77!",
]);

export default function AddBudgetScreen() {
  const [budgetName, setBudgetName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [budgets, setBudgets] = useState([]);
  const [editingBudget, setEditingBudget] = useState(null);

  const fetchBudgets = useCallback(async () => {
    try {
      console.log("Fetching budgets from:", API_URL);
      const response = await axios.get(API_URL);
      setBudgets(response.data);
    } catch (error) {
      console.error("Error fetching budgets:", error);
      Alert.alert("Error", "Failed to fetch budgets.");
    }
  }, []);

  useEffect(() => {
    fetchBudgets();
  }, [fetchBudgets]);

  const validateFields = () => {
    if (!budgetName.trim()) {
      Alert.alert("Validation Error", "Budget name is required.");
      return false;
    }
    if (!amount.trim() || isNaN(amount) || parseFloat(amount) <= 0) {
      Alert.alert("Validation Error", "Please enter a valid amount greater than 0.");
      return false;
    }
    if (!category) {
      Alert.alert("Validation Error", "Please select a category.");
      return false;
    }
    return true;
  };

  const handleSaveBudget = async () => {
    if (!validateFields()) return;

    const newBudget = {
      budgetName,
      amount: parseFloat(amount),
      category,
      date: date.toDateString(),
    };

    try {
      if (editingBudget) {
        await axios.put(`${API_URL}/${editingBudget._id}`, newBudget);
        Alert.alert("Success", "Budget updated successfully!");
      } else {
        await axios.post(API_URL, newBudget);
        Alert.alert("Success", "Budget saved successfully!");
      }
      fetchBudgets();
      resetForm();
    } catch (error) {
      console.error("Error saving budget:", error);
      Alert.alert("Error", "Failed to save budget.");
    }
  };

  const handleEditBudget = (budget) => {
    setEditingBudget(budget);
    setBudgetName(budget.budgetName);
    setAmount(budget.amount.toString());
    setCategory(budget.category);
    setDate(new Date(budget.date));
  };

  const handleDeleteBudget = async (id) => {
    Alert.alert("Delete Budget", "Are you sure you want to delete this budget?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        onPress: async () => {
          try {
            await axios.delete(`${API_URL}/${id}`);
            fetchBudgets();
          } catch (error) {
            console.error("Error deleting budget:", error);
          }
        },
        style: "destructive",
      },
    ]);
  };

  const resetForm = () => {
    setBudgetName("");
    setAmount("");
    setCategory("");
    setDate(new Date());
    setEditingBudget(null);
  };

  // Calculate total budget
  const totalBudget = budgets.reduce((sum, budget) => sum + parseFloat(budget.amount), 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{editingBudget ? "Edit Budget" : "Add New Budget"}</Text>
      <TextInput style={styles.input} placeholder="Budget Name" value={budgetName} onChangeText={setBudgetName} />
      <TextInput style={styles.input} placeholder="Amount" keyboardType="numeric" value={amount} onChangeText={setAmount} />
      <View style={styles.pickerContainer}>
        <Picker selectedValue={category} onValueChange={(itemValue) => setCategory(itemValue)}>
          <Picker.Item label="Select Category" value="" />
          <Picker.Item label="Food" value="Food" />
          <Picker.Item label="Transportation" value="Transportation" />
          <Picker.Item label="Utilities" value="Utilities" />
          <Picker.Item label="Rent" value="Rent" />
        </Picker>
      </View>
      <TouchableOpacity style={styles.datePicker} onPress={() => setShowDatePicker(true)}>
        <Ionicons name="calendar" size={20} color="green" />
        <Text style={styles.dateText}>Select Date: {date.toDateString()}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) setDate(selectedDate);
          }}
        />
      )}
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveBudget}>
        <Text style={styles.saveButtonText}>{editingBudget ? "Update Budget" : "Save Budget"}</Text>
      </TouchableOpacity>
      <FlatList
        data={budgets}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.budgetItem}>
            <Text style={styles.budgetText}>{item.budgetName} - Rs. {item.amount}</Text>
            <Text style={styles.budgetDetails}>Category: {item.category}</Text>
            <Text style={styles.budgetDetails}>Date: {item.date}</Text>
            <TouchableOpacity onPress={() => handleEditBudget(item)}>
              <Text style={styles.editButton}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDeleteBudget(item._id)}>
              <Text style={styles.deleteButton}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <View style={styles.totalBudgetContainer}>
        <Text style={styles.totalBudgetText}>Total Budget: Rs. {totalBudget.toFixed(2)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#e9f7cf" },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  input: { height: 40, borderColor: "#ccc", borderWidth: 1, marginBottom: 15, paddingLeft: 10, fontSize: 16, backgroundColor: "#fff" },
  pickerContainer: { borderWidth: 1, borderColor: "#ccc", marginBottom: 15, padding: 5, borderRadius: 5, backgroundColor: "#fff" },
  datePicker: { flexDirection: "row", alignItems: "center", borderBottomWidth: 1, borderColor: "#ccc", marginBottom: 15, paddingVertical: 5 },
  dateText: { marginLeft: 10, fontSize: 16, color: "#333" },
  saveButton: { backgroundColor: "#28a745", paddingVertical: 12, borderRadius: 5, alignItems: "center" },
  saveButtonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  budgetItem: { backgroundColor: "#fff", padding: 10, borderRadius: 5, marginVertical: 5, elevation: 3 },
  budgetText: { fontSize: 16, fontWeight: "bold" },
  budgetDetails: { fontSize: 14, color: "#555" },
  editButton: { backgroundColor: "#f39c12", padding: 8, borderRadius: 5, marginRight: 5, color: "#fff", fontWeight: "bold" },
  deleteButton: { backgroundColor: "#e74c3c", padding: 8, borderRadius: 5, color: "#fff", fontWeight: "bold" },
  totalBudgetContainer: {
    marginTop: 15,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  totalBudgetText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
});
