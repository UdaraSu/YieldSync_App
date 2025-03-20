import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";

// Sample community posts
const initialPosts = [
  {
    id: "1",
    title: "Best Farming Practices",
    content: "What are the best practices for organic farming?",
    image: { uri: "https://source.unsplash.com/featured/?farm" },
    likes: 5,
    comments: 2,
  },
  {
    id: "2",
    title: "Climate Change & Crops",
    content: "How does climate change impact crop growth?",
    image: { uri: "https://source.unsplash.com/featured/?climate" },
    likes: 12,
    comments: 6,
  },
  {
    id: "3",
    title: "Organic vs. GMOs",
    content: "Should farmers switch to organic or GMOs?",
    image: { uri: "https://source.unsplash.com/featured/?plants" },
    likes: 8,
    comments: 3,
  },
];

//  Forum Screen (Grid View)
export default function ForumScreen({ navigation }) {
  const [posts, setPosts] = useState(initialPosts);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🌿 Community Forum</Text>
        <TouchableOpacity onPress={() => navigation.navigate("NewPost", { posts, setPosts })}>
          <Icon name="plus-circle" size={30} color="#2d6a4f" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        numColumns={2} // Grid layout
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.postGrid}
            onPress={() => navigation.navigate("PostDetail", { post: item })}
          >
            <Image source={item.image} style={styles.postImage} />
            <View style={styles.postContent}>
              <Text style={styles.postTitle}>{item.title}</Text>
              <View style={styles.postStats}>
                <Text>❤️ {item.likes}</Text>
                <Text>💬 {item.comments}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

//  Styles
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  title: { fontSize: 24, fontWeight: "bold", color: "#2d6a4f" },
  postGrid: { flex: 1, margin: 5, backgroundColor: "#fff", borderRadius: 8, elevation: 2, overflow: "hidden" },
  postImage: { width: "100%", height: 120, borderRadius: 5 },
  postContent: { padding: 10 },
  postTitle: { fontWeight: "bold", fontSize: 16 },
  postStats: { flexDirection: "row", justifyContent: "space-between", marginTop: 5 },
});
