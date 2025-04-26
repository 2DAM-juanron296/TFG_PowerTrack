import { Link, Stack, Tabs, useRouter } from "expo-router";
import { ChatIcon, HomeIcon } from "../../../components/Icons";
import { TrainingIcon } from "../../../components/Icons";
import { ProfileIcon } from "../../../components/Icons";
import { useState } from "react";
import { Image, Pressable, SafeAreaViewBase, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Logout } from "../../../components/Logout";

export default function TabsLayout() {
  const [focusedTab, setFocusedTab] = useState("home");
  const router = useRouter();

  const getTabStyle = (tabName) => {
    const isFocused = focusedTab === tabName;
    return {
      marginHorizontal: 16,
      backgroundColor: isFocused ? "#222" : "transparent",
      borderTopWidth: isFocused ? 0.5 : 0,
      borderLeftWidth: isFocused ? 0.5 : 0,
      borderRightWidth: isFocused ? 0.5 : 0,
      borderColor: isFocused ? "#333" : "transparent",
      borderTopLeftRadius: isFocused ? 10 : 0,
      borderTopRightRadius: isFocused ? 10 : 0,
    };
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#0F0F0F",
          borderTopWidth: 0,
          height: 55,
        },
        tabBarActiveTintColor: "#25AEA6",
        tabBarInactiveTintColor: "white",
        tabBarLabelStyle: { fontFamily: "Inter-Bold", fontSize: 11 },
      }}
    >
      <Tabs.Screen
        name="home"
        listeners={{
          focus: () => setFocusedTab("home"),
        }}
        options={{
          title: "Home",
          tabBarIcon: () => <HomeIcon />,
          tabBarItemStyle: getTabStyle("home"),
        }}
      />
      <Tabs.Screen
        name="training"
        listeners={{
          focus: () => setFocusedTab("training"),
        }}
        options={{
          title: "Training",
          tabBarIcon: () => <TrainingIcon />,
          tabBarItemStyle: getTabStyle("training"),
        }}
      />
      <Tabs.Screen
        name="chat"
        listeners={{
          focus: () => setFocusedTab("chat"),
        }}
        options={{
          title: "Chat",
          tabBarIcon: () => <ChatIcon />,
          tabBarItemStyle: getTabStyle("chat"),
        }}
      />
      <Tabs.Screen
        name="profile"
        listeners={{
          focus: () => setFocusedTab("profile"),
        }}
        options={{
          title: "Profile",
          tabBarIcon: () => <ProfileIcon />,
          tabBarItemStyle: getTabStyle("profile"),
        }}
      />
    </Tabs>
  );
}
