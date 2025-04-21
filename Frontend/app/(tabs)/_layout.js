import { Tabs } from "expo-router";
import { HomeIcon } from "../../components/Icons";
import { TrainingIcon } from "../../components/Icons";
import { ProfileIcon } from "../../components/Icons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: "#000" },
        tabBarActiveTintColor: "#25AEA6",
        tabBarInactiveTintColor: "white",
        tabBarLabelStyle: { fontFamily: "Inter-Bold", fontSize: 11 },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: () => <HomeIcon />,
        }}
      />
      <Tabs.Screen
        name="training"
        options={{
          title: "Training",
          tabBarIcon: () => <TrainingIcon />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: () => <ProfileIcon />,
        }}
      />
    </Tabs>
  );
}
