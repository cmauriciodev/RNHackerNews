import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../presentation/home';
import { ArticleScreen } from '../presentation/article';

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
