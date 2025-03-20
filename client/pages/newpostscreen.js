import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from "react-native";

export default function NewPostScreen({ route, navigation }) {
  const { posts, setPosts } = route.params;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const addPost = () => {
    if (!title.trim() || !content.trim()) {
      alert("Please enter a title and content.");
      return;
    }
    const newPost = {
      id: Math.random().toString(),
      title,
      content,
      image: { uri: "https://source.unsplash.com/featured/?agriculture" },
      likes: 0,
      comments: 0,
    };
    setPosts([...posts, newPost]);
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Create a New Post</Text>
      <TextInput placeholder="Title" style={styles.input} value={title} onChangeText={setTitle} />
      <TextInput placeholder="Content" style={styles.input} value={content} onChangeText={setContent} multiline />
      <TouchableOpacity style={styles.button} onPress={addPost}>
        <Text style={styles.buttonText}>Post</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
  title: { fontSize: 24, fontWeight: "bold", color: "#2d6a4f" },
  input: { borderWidth: 1, padding: 10, marginVertical: 10, borderRadius: 5, backgroundColor: "#fff" },
  button: { backgroundColor: "#2d6a4f", padding: 15, borderRadius: 5, alignItems: "center", marginTop: 10 },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
