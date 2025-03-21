import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native';

export default function HomePage() {
  return (
    <ImageBackground
      source={require('./assets/background.png')} // Replace with your background image path
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>YieldSync</Text>
        <Image
          source={require('./assets/logo.png')} // Replace with your actual logo path
          style={styles.logo}
        />
        <Text style={styles.subtitle}>Your Smart Farm Assistant</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // Makes the background image cover the whole screen
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    fontFamily: 'serif',
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    position: 'absolute',
    bottom: 30,
  },
});
