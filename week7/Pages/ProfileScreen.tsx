
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import PersonalInfoScreen from './PersonalInfoScreen';
import AccountSettingsScreen from './AccountSettingsScreen';

const Tab = createMaterialTopTabNavigator();

const ProfileTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Personal Info" component={PersonalInfoScreen} />
      <Tab.Screen name="Account Settings" component={AccountSettingsScreen} />
    </Tab.Navigator>
  );
};

export default ProfileTabNavigator;