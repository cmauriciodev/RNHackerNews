import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { DeletedScreen } from '../screens';

export type DeletedStackParams = {
    DeletedScreen: undefined;
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
        </Stack.Navigator>
    );
};
