import { Tabs } from "expo-router";
import { HomeIcon } from "../../components/Icons";
import { TrainingIcon } from "../../components/Icons";
import { ProfileIcon } from "../../components/Icons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#000",
          borderTopWidth: 0,
          overflow: "hidden",
        },
        tabBarActiveTintColor: "#25AEA6",
        tabBarActiveBackgroundColor: "#1d1d1d",
        tabBarInactiveTintColor: "white",
        tabBarLabelStyle: { fontFamily: "Inter-Bold", fontSize: 11 },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: () => <HomeIcon />,
          tabBarItemStyle: {
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            marginHorizontal: 25,
          },
        }}
      />
      <Tabs.Screen
        name="training"
        options={{
          title: "Training",
          tabBarIcon: () => <TrainingIcon />,
          tabBarItemStyle: {
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            marginHorizontal: 25,
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: () => <ProfileIcon />,
          tabBarItemStyle: {
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            marginHorizontal: 25,
          },
        }}
      />
    </Tabs>
  );
}
