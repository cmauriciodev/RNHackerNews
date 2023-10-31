import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ArticleScreen, HomeScreen } from '../screens';

export type NewsStackParams = {
    HomeScreen: undefined;
    ArticleScreen: { url: string; story_title: string };
};

const Stack = createStackNavigator<NewsStackParams>();

export const NewsNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="HomeScreen"
                component={HomeScreen}
            />
            <Stack.Screen
                options={{
                    headerBackTitle: 'Back',
                    title: '',
                }}
                name="ArticleScreen"
                component={ArticleScreen}
            />
        </Stack.Navigator>
    );
};
