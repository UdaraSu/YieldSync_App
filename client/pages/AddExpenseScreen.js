import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function AddExpenseScreen({ navigation }) {
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [category, setCategory] = useState('Select Category');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [expenses, setExpenses] = useState([]); // Store recent expenses
    const [isEditing, setIsEditing] = useState(false); // Track if we are editing an existing expense
    const [editExpenseId, setEditExpenseId] = useState(null); // Track expense being edited

    // Fetch recent expenses from backend (you can replace with your API)
    const fetchExpenses = async () => {
        try {
            const response = await fetch('http://192.168.179.92:5000/api/expenses'); // Update URL to your backend
            const data = await response.json();
            setExpenses(data);
        } catch (error) {
            console.error('Error fetching expenses:', error);
        }
    };

    useEffect(() => {
        navigation.setOptions({
            title: 'Add Expense',
            headerStyle: {
                backgroundColor: '#2e7d32', // Green background
            },
            headerTintColor: '#fff', // White text and back arrow
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        });
    }, [navigation]);
    

    useEffect(() => {
        fetchExpenses(); // Fetch the expenses when the component mounts
    }, []);

    const onDateChange = (event, selectedDate) => {
        setShowDatePicker(false);
        if (selectedDate) {
            setDate(selectedDate); // Update the selected date
        }
    };

    // Validation function
    const validateFields = () => {
        if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
            Alert.alert('Invalid Input', 'Please enter a valid amount greater than 0.');
            return false;
        }
        if (!category || category === 'Select Category') {
            Alert.alert('Invalid Input', 'Please select a category.');
            return false;
        }
        if (!description.trim()) {
            Alert.alert('Invalid Input', 'Please enter a description.');
            return false;
        }
        if (!date) {
            Alert.alert('Invalid Input', 'Please select a date.');
            return false;
        }
        return true;
    };

    const onSave = async () => {
        if (validateFields()) {
            const expenseData = { date, category, amount, description };
            const url = isEditing
                ? `http://192.168.179.92:5000/api/expenses/update/${editExpenseId}`
                : 'http://192.168.179.92:5000/api/expenses/create';
    
            try {
                const response = await fetch(url, {
                    method: isEditing ? 'PUT' : 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(expenseData),
                });
    
                if (!response.ok) {
                    const errorText = await response.text();
                    console.error('Error saving expense:', errorText);
                    Alert.alert('Error', `Saving failed: ${errorText}`);
                    return;
                }
    
                Alert.alert('Success', isEditing ? '🪄 Expense updated successfully!' : '✅ Expense saved successfully!');
                fetchExpenses(); // Refresh the expenses list
            } catch (error) {
                console.error('Error saving expense:', error);
                Alert.alert('Error', `Saving failed: ${error.message}`);
            }
        }
    };

    // Delete Expense
    const onDelete = async (id) => {
        Alert.alert(
          'Delete Expense',
          'Are you sure you want to delete this expense?',
          [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'Delete',
              onPress: async () => {
                try {
                  const response = await fetch(`http://192.168.179.92:5000/api/expenses/delete/${id}`, {
                    method: 'DELETE',
                  });
      
                  if (response.ok) {
                    Alert.alert('Success', '🗑️ Expense deleted successfully!');
                    fetchExpenses(); // Refresh the expenses list after deletion
                  } else {
                    const errorText = await response.text(); // Read error message from server
                    Alert.alert('Error', `Failed to delete expense: ${errorText}`);
                  }
                } catch (error) {
                  console.error('Error deleting expense:', error);
                  Alert.alert('Error', 'An error occurred while deleting the expense.');
                }
              },
            },
          ]
        );
    };

    const handleEdit = (expenseId) => {
        navigation.navigate('UpdateExpenseScreen', { expenseId });  // Navigate to Edit Expense screen
    };

    const renderExpenseItem = ({ item }) => (
        <View style={styles.expenseItem}>
            <Text style={styles.expenseText}>{`${item.description} - $${item.amount}`}</Text>
            <Text style={styles.expenseCategoryText}>Category: {item.category}</Text>
            <Text style={styles.expenseDateText}>Date: {new Date(item.date).toLocaleDateString()}</Text>
            <View style={styles.expenseButtons}>
                <TouchableOpacity style={styles.editButton} onPress={() => handleEdit(item)}>
                    <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(item._id)}>
                    <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add New Expense</Text>

            {/* Expense Name */}
            <TextInput
                style={styles.input}
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
            />

            {/* Amount Input */}
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Amount"
                value={amount}
                onChangeText={setAmount}
            />

            {/* Category Picker */}
            <View style={styles.pickerContainer}>
                <Picker selectedValue={category} onValueChange={setCategory} style={styles.picker}>
                    <Picker.Item label="Select Category" value="Select Category" />
                    <Picker.Item label="🌱Food" value="🌱Food" />
                    <Picker.Item label="🛠️Utilities" value="🛠️Utilities" />
                    <Picker.Item label="⚙️Entertainment" value="⚙️Entertainment" />
                </Picker>
            </View>

            {/* Date Picker Button */}
            <TouchableOpacity style={styles.datePicker} onPress={() => setShowDatePicker(true)}>
                <Ionicons name="calendar" size={22} color="#2e7d32" />
                <Text style={styles.dateText}>{date.toDateString()}</Text>
            </TouchableOpacity>

            {/* DateTimePicker */}
            {showDatePicker && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    display="spinner"  // Use spinner to select date
                    onChange={onDateChange}
                    style={styles.dateTimePicker}
                />
            )}

            {/* Save Button */}
            <TouchableOpacity style={styles.saveButton} onPress={onSave}>
                <Text style={styles.saveButtonText}>{isEditing ? 'Update Expense' : 'Save Expense'}</Text>
            </TouchableOpacity>

            {/* View Recent Expenses */}
            <Text style={styles.viewExpensesText}>Recorded Expenses:</Text>
            <FlatList
                data={expenses}
                renderItem={renderExpenseItem}
                keyExtractor={(item) => item._id.toString()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 25,
        backgroundColor: '#e8f5e9',
        justifyContent: 'flex-start',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#333',
        marginBottom: 25,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 14,
        borderRadius: 10,
        marginBottom: 15,
        fontSize: 16,
        color: '#333',
        backgroundColor: '#fff',
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        marginBottom: 15,
        overflow: 'hidden',
        backgroundColor: '#fff',
    },
    picker: {
        height: 54,
        color: '#333',
    },
    datePicker: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        borderColor: '#ddd',
    },
    dateText: {
        marginLeft: 12,
        fontSize: 15,
        color: '#333',
        fontWeight: '600',
    },
    dateTimePicker: {
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    saveButton: {
        backgroundColor: '#2e7d32',
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 4, height: 10 },
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    expenseItem: {
        backgroundColor: '#fff',
        padding: 15,
        marginBottom: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 5, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    expenseText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    expenseCategoryText: {
        fontSize: 14,
        color: '#666',
    },
    expenseDateText: {
        fontSize: 12,
        color: '#aaa',
        marginBottom: 10,
    },
    expenseButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    editButton: {
        backgroundColor: '#f5ad42',
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    deleteButton: {
        backgroundColor: '#d32f2f',
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    viewExpensesText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
    },
});
