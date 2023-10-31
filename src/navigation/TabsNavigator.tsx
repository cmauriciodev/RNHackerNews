import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { NewsNavigator } from './NewsNavigator';
import { DeletedNavigator } from './DeletedNavigator';

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
                    name="DeletedNavigator"
                    component={DeletedNavigator}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
};
