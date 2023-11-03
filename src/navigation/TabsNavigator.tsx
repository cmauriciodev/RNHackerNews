import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
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
                    tabBarLabelStyle: {
                        marginBottom: 3,
                    },
                    tabBarIconStyle: {
                        marginTop: 3,
                    },
                }}>
                <Tab.Screen
                    options={{
                        title: 'News',
                        tabBarIcon: NewsIcon,
                    }}
                    name="NewsNavigator"
                    component={NewsNavigator}
                />
                <Tab.Screen
                    options={{
                        title: 'Deleted News',
                        tabBarIcon: DeletedNewsIcon,
                    }}
                    name="DeletedNavigator"
                    component={DeletedNavigator}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

const NewsIcon = ({ color }: { color: string }) => (
    <Icon name="trending-up" color={color} size={25} />
);
const DeletedNewsIcon = ({ color }: { color: string }) => (
    <Icon name="trash-sharp" color={color} size={22} />
);
