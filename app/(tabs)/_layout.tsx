import React from "react";
import { Tabs } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from '@expo/vector-icons';
export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      sceneContainerStyle={{ 
        backgroundColor: "white",
       }}
      safeAreaInsets={{
        // top:100,
        // bottom:50,
        // left:20,
        // right:20
      }}
    >
      <Tabs.Screen
        name="home/index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => {
            return (
              <AntDesign
                name="home"
                size={24}
                color={focused ? "blue" : "black"}
              />
            );
          },
        }}
      />

      <Tabs.Screen
        name="search/index"
        options={{
          title: "Search",
          tabBarIcon: ({ focused }) => {
            return (
              <AntDesign
                name="search1"
                size={24}
                color={focused ? "blue" : "black"}
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="bookmark/index"
        options={{
          title: "Bookmark",
          tabBarIcon: ({ focused }) => {
            return (
              <Feather name="bookmark" size={24} color={focused ? "blue" : "black"} />
            );
          },
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          title: "profile",
          tabBarIcon: ({ focused }) => {
            return (
              <AntDesign
                name="user"
                size={24}
                color={focused ? "blue" : "black"}
              />
            );
          },
        }}
      />
    </Tabs>
  );
}
