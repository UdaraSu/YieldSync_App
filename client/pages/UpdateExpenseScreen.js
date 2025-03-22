import React, { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function UpdateExpenseScreen({ route, navigation }) {
    const { expenseId } = route.params;  // Retrieve the passed expenseId
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);


    useEffect(() => {
        navigation.setOptions({
            title: 'Update Expense',
            headerStyle: {
                backgroundColor: '#2e7d32',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        });
    }, [navigation]);
    const onDateChange = (event, selectedDate) => {
        setShowDatePicker(false);
        if (selectedDate) {
            setDate(selectedDate); // Update the selected date
        }
    };

    // Simulate fetching the expense data based on the expenseId (replace with actual API call)
    useEffect(() => {
        if (expenseId) {
            // In a real app, fetch the data using the expenseId.
            // Example hardcoded values (you would replace this with API call logic).
            setCategory('🌱Food');
            setAmount('150');
            setDescription('project');
            setDate(new Date());
        }
    }, [expenseId]);

    const validateFields = () => {
        if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
            Alert.alert('Invalid Input', 'Please enter a valid amount greater than 0.');
            return false;
        }
        if (!category) {
            Alert.alert('Invalid Input', 'Please select a category.');
            return false;
        }
        if (!description.trim()) {
            Alert.alert('Invalid Input', 'Please enter a description.');
            return false;
        }
        return true;
    };

    const onSave = () => {
        if (validateFields()) {
            // Add logic to update the expense
            Alert.alert('Success', '🟢 Expense updated successfully!');
            navigation.goBack(); // Go back to the previous screen after saving
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Update Expense</Text>
            
            <TextInput
                style={styles.input}
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
            />

            <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Amount"
                value={amount}
                onChangeText={setAmount}
            />

            <View style={styles.pickerContainer}>
            <Picker selectedValue={category} onValueChange={setCategory} style={styles.picker}>
                    <Picker.Item label="Select Category" value="" />
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
    
            <TouchableOpacity style={styles.saveButton} onPress={onSave}>
                <Text style={styles.saveButtonText}>Update Expense</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#e8f5e9',
        textAlign: 'center',
        marginTop: 15,
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 35,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 14,
        borderRadius: 10,
        fontSize: 16,
        color: '#333',
        backgroundColor: '#fff',
        marginBottom: 28,
        
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        marginBottom: 28,
        overflow: 'hidden',
        backgroundColor: '#fff',
    },
    
    datePicker: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 35,
        borderColor: '#ddd',
    },
    dateText: {
        marginLeft: 12,
        fontSize: 15,
        color: '#333',
        fontWeight: '450',
    },
    dateTimePicker: {
        backgroundColor: '#fff',
        borderRadius: 10,
        borderColor: '#ddd',
        marginBottom: 55,
    },
    saveButton: {
        backgroundColor: '#2e7d32',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
