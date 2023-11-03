import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { DeletedScreen } from '../deleted';
import { ArticleScreen } from '../article';

export type DeletedStackParams = {
    DeletedScreen: undefined;
    ArticleScreen: { url: string; storyTitle: string };
};

const Stack = createStackNavigator<DeletedStackParams>();

export const DeletedNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="DeletedScreen"
                component={DeletedScreen}
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
