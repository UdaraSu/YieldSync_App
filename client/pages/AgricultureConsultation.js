import React, { useState } from "react";
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";

// Agriculture Consultation Screen UI
const AgricultureConsultation = () => {
  const [announcements] = useState([
    { id: "1", title: "🌱 New Farming Techniques", body: "Learn about advanced irrigation systems for better crop yield.", date: "March 18, 2025" },
    { id: "2", title: "⚠️ Pesticide Alert", body: "Farmers are advised to avoid using harmful chemicals this season.", date: "March 12, 2025" },
    { id: "3", title: "💰 Government Subsidy", body: "Eligible farmers can now apply for the 2025 subsidy program.", date: "March 5, 2025" },
  ]);

  return (
    <SafeContainer>
      <StatusBar style="dark" />

      {/* Header Section */}
      <Header>
        <LogoContainer>
          <Ionicons name="leaf-outline" size={28} color="white" />
          <HeaderTitle>Agriculture Consultation</HeaderTitle>
        </LogoContainer>
        <MenuIcon>
          <Ionicons name="menu" size={28} color="white" />
        </MenuIcon>
      </Header>

      {/* Announcements List */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {announcements.map((item) => (
          <AnnouncementCard key={item.id}>
            <AnnouncementTitle>{item.title}</AnnouncementTitle>
            <AnnouncementBody>{item.body}</AnnouncementBody>
            <AnnouncementDate>{item.date}</AnnouncementDate>
          </AnnouncementCard>
        ))}
      </ScrollView>

      {/* Footer Section */}
      <Footer>
        <FooterText>© 2025 Agriculture Office</FooterText>
      </Footer>
    </SafeContainer>
  );
};

// Styled Components for UI
const SafeContainer = styled(SafeAreaView)`
  flex: 1;
  background-color: #f5f5f5;
  padding: 20px;
`;

const Header = styled(View)`
  background-color: #2e7d32;
  padding: 15px;
  border-radius: 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const LogoContainer = styled(View)`
  flex-direction: row;
  align-items: center;
`;

const HeaderTitle = styled(Text)`
  font-size: 20px;
  font-weight: bold;
  color: white;
  margin-left: 10px;
`;

const MenuIcon = styled(TouchableOpacity)``;

const AnnouncementCard = styled(View)`
  background-color: white;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 10px;
  shadow-color: black;
  shadow-opacity: 0.1;
  shadow-radius: 5px;
  elevation: 3;
`;

const AnnouncementTitle = styled(Text)`
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;

const AnnouncementBody = styled(Text)`
  font-size: 14px;
  color: #666;
  margin-top: 5px;
`;

const AnnouncementDate = styled(Text)`
  font-size: 12px;
  color: gray;
  margin-top: 5px;
`;

const Footer = styled(View)`
  padding: 10px;
  align-items: center;
  margin-top: 20px;
`;

const FooterText = styled(Text)`
  font-size: 12px;
  color: gray;
`;

export default AgricultureConsultation;
