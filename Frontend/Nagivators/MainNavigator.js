import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomeNavigator from './HomeNavigator';

const Tab = createBottomTabNavigator();

const MainNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarShowLabel: false, // hide labels
        tabBarHideOnKeyboard: true, // hide tab bar when keyboard is visible
        tabBarActiveTintColor: '#e91e63', // active icon color
        tabBarInactiveTintColor: '#3e2465', // inactive icon color
      }}>
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({color}) => <Icon name="home" color={color} size={26} />,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Cart"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="shopping-cart" color={color} size={26} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="DeliveryMan"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({color}) => <Icon name="cog" color={color} size={26} />,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="User"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({color}) => <Icon name="user" color={color} size={26} />,
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigator;
