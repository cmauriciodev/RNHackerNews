import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../home';
import { ArticleScreen } from '../article';

export type NewsStackParams = {
    HomeScreen: undefined;
    ArticleScreen: { url: string; storyTitle: string };
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
