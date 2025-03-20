import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>📊 Financial Management</Text>

            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('AddExpense') }>
                <Ionicons name="add-circle" size={30} color="#2E7D32" />
                <Text style={styles.cardText}>Add New Expense</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('BudgetPlanning') }>
                <Ionicons name="cash-outline" size={30} color="#2E7D32" />
                <Text style={styles.cardText}>Budget Planning</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('FinancialReports') }>
                <Ionicons name="bar-chart" size={30} color="#2E7D32" />
                <Text style={styles.cardText}>Financial Reports</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#E8F5E9',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#1B5E20',
        marginBottom: 20,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#C8E6C9',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
    },
    cardText: {
        fontSize: 18,
        marginLeft: 10,
        color: '#1B5E20',
    },
});
