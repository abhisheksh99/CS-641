// src/navigation/TabNavigator.tsx
import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../context/authContext';
import IncomeExpenseScreen from '../screens/IncomeExpenseScreen';
import ProfileScreen from '../screens/ProfileScreen';


const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) return null;

  const { user } = authContext;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Profile') {
            iconName = 'person';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#6200EE',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen
        name="Home"
        component={IncomeExpenseScreen}
        options={{
          title: `Welcome, ${user?.displayName || user?.email}!`, // Set dynamic title
          headerStyle: {
            backgroundColor: '#6200EE',
          },
          headerTitleStyle: {
            color: '#fff',
            fontSize: 18,
            fontWeight: 'bold',
          },
        }}
      />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
