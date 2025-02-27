import { Slot, Tabs } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
const TabBarIcon = ({
  focused,
  icon,
  title,
}: {
  focused: boolean;
  icon: any;
  title: string;
}) => {
  return (
    <View className="flex-1  flex flex-col items-center">
      {icon}
      <Text
        className={`${focused ? "text-blue-500" : "text-gray-400"} w-full  `}
      >
        {title}
      </Text>
    </View>
  );
};

const Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "white",
          position: "absolute",
          borderTopColor: "#006aFF1A",
          borderTopWidth: 1,
          minHeight: 70,

          paddingTop: 10,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              focused={focused}
              title="Home"
              icon={
                <Ionicons
                  name={focused ? "home" : "home-outline"}
                  size={24}
                  color="black"
                />
              }
            />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          headerShown: false,
          title: "Chat", // Title of the tab is hidden
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              focused={focused}
              title="Chat"
              icon={
                <Ionicons
                  name={focused ? "chatbox" : "chatbox-outline"}
                  size={24}
                  color="black"
                />
              }
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          title: "Profile", // Title of the tab is hidden
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              focused={focused}
              title="Profile"
              icon={
                <MaterialCommunityIcons
                  name={focused ? "account" : "account-outline"}
                  size={24}
                  color="black"
                />
              }
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;
