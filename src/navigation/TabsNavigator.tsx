import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { NewsNavigator } from './NewsNavigator';
import { DeletedScreen } from '../screens';

const Tab = createBottomTabNavigator();

export const TabsNavigator = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                }}>
                <Tab.Screen
                    options={{ title: 'News' }}
                    name="NewsNavigator"
                    component={NewsNavigator}
                />
                <Tab.Screen
                    options={{ title: 'Deleted News' }}
                    name="DeletedScreen"
                    component={DeletedScreen}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
};
