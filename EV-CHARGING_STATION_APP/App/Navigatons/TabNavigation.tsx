import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; 

import Colors from '../Utils/Colors';
import HomeScreen from '../Screen/HomeScreen'; 
import FavoriteScreen from '../Screen/FavoriteScreen';
import ProfileScreen from '../Screen/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: Colors.WHITE }, 
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
            tabBarLabel: 'Home',
            tabBarActiveTintColor: Colors.PRIMARY,
            tabBarIcon: ({color, size}) => (
                <Ionicons name="search" 
                size={size} color={color} />
            )
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={FavoriteScreen}
        options={{
            tabBarLabel: 'Favorites',
            tabBarActiveTintColor: Colors.PRIMARY,
            tabBarIcon: ({color, size}) => (
                <Ionicons name="heart" 
                size={size} color={color} />
            )
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
            tabBarLabel: 'Profile',
            tabBarActiveTintColor: Colors.PRIMARY,
            tabBarIcon: ({color, size}) => (
                <Ionicons name="person" 
                size={size} color={color} />
            )
        }} 
      />
    </Tab.Navigator>
  );
}