import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screen/HomeScreen';
import ProfileScreen from '../screen/ProfileScreen';
import { Ionicons } from "@expo/vector-icons"; 
import { useContext } from 'react';
import { ThemeContext } from '../screen/ThemeContext';
import CatGame from '../screen/CatGame';


const Tab = createBottomTabNavigator();



const TabNavigator = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Profile") {
              iconName = focused ? "logo-octocat" : "logo-octocat";
            }else if (route.name === "CatGame") {
              iconName = focused ? "game-controller" : "game-controller-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor:theme==="light" ?"tomato":"blue", // Active tab color
          tabBarInactiveTintColor: "gray", // Inactive tab color
          tabBarStyle: { backgroundColor: "#fff", paddingBottom: 5 }, // Custom tab bar style
        })}
      >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen}/>
      <Tab.Screen name='CatGame' component={CatGame}/>
    
    </Tab.Navigator>
  );
};

export default TabNavigator;