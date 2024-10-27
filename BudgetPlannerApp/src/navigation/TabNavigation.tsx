import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../context/authContext';
import IncomeExpenseScreen from '../screens/IncomeExpenseScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AddExpenseScreen from '../screens/AddExpenseScreen';

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
          } else if (route.name === 'Add Expense') {
            iconName = 'add-circle';
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
      <Tab.Screen 
        name="Add Expense" 
        component={AddExpenseScreen} 
        options={{ 
          headerTitle: 'Add Expense',
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
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{ 
          title: 'Profile',
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
    </Tab.Navigator>
  );
};

export default TabNavigator;