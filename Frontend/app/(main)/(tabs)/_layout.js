import { Tabs } from "expo-router";
import { ChatIcon, HomeIcon } from "../../../utils/Icons";
import { TrainingIcon } from "../../../utils/Icons";
import { ProfileIcon } from "../../../utils/Icons";
import { useState } from "react";

export default function TabsLayout() {
  const [focusedTab, setFocusedTab] = useState("home");

  const tabs = {
    home: <HomeIcon />,
    training: <TrainingIcon />,
    chat: <ChatIcon />,
    profile: <ProfileIcon />,
  };

  const getTabStyle = (tabName) => {
    const isFocused = focusedTab === tabName;
    return {
      marginHorizontal: 12,
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
      {Object.keys(tabs).map((name) => (
        <Tabs.Screen
          key={name}
          name={name}
          listeners={{
            focus: () => setFocusedTab(name),
          }}
          options={{
            title: name.charAt(0).toUpperCase() + name.slice(1),
            tabBarIcon: () => tabs[name],
            tabBarItemStyle: getTabStyle(name),
          }}
        />
      ))}
    </Tabs>
  );
}
