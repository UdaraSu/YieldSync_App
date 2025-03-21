import React from "react";
import { View, Text, Image } from "react-native";

const Header = () => {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10, backgroundColor: "#e8f5e9" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", color: "#2E7D32" }}>Hi, Saman 👋</Text>
      <Image
        source={{ uri: "https://static.vecteezy.com/system/resources/thumbnails/030/751/190/small/portrait-farmer-with-vegetables-ai-generative-photo.jpg" }}
        style={{ width: 40, height: 40, borderRadius: 20, borderWidth: 2, borderColor: "#2E7D32" }}
      />
    </View>
  );
};

export default Header;
