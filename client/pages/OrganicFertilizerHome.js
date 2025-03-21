import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';

export default function FertilizerHomePage({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Organic Fertilizer Calculator</Text>
      </View>

      {/* Main content */}
      <View style={styles.content}>
        {/* Description */}
        <Text style={styles.description}>
          In this section, you can calculate the amount of organic fertilizer you need and check the climate conditions in your area.
        </Text>

        {/* Buttons */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('FertilizerCalculator')}
        >
          <Text style={styles.buttonText}>Organic fertilizer calculator</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('WeatherChecker')}
        >
          <Text style={styles.buttonText}>Soil & Weather condition checker</Text>
        </TouchableOpacity>

        {/* Logo */}
        <Image
          source={require('./assets/logo.png')} // Replace with your logo path
          style={styles.logo}
          resizeMode="contain"
        />

        {/* Tagline */}
        <Text style={styles.tagline}>Grow together!</Text>

        {/* Footer */}
        <Text style={styles.footerText}>
          Connect, share, and learn empowering farmers with expert advice and community wisdom.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 50,
  },
  header: {
    backgroundColor: '#3FA34D',
    width: '100%',
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 30,
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    width: '90%', // Adjust width to ensure proper fitting on different screens
    alignItems: 'center',
  },
  description: {
    textAlign: 'center',
    fontSize: 14,
    color: '#333',
    marginBottom: 100,
  },
  button: {
    backgroundColor: '#3FA34D',
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    width: '100%', // Ensures buttons stretch to the width of the container
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  logo: {
    width: 100, // Adjust logo size for better proportion
    height: 100,
    marginVertical: 70,
  },
  tagline: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  footerText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#666',
    paddingHorizontal: 10, // Prevents text from touching edges
  },
});
