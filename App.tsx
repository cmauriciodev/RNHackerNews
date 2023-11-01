import React from 'react';
import 'react-native-gesture-handler';
import { TabsNavigator } from './src/navigation/TabsNavigator';
import { NewsProvider } from './src/context/NewsProvider';

const App = () => {
    return (
        <NewsProvider>
            <TabsNavigator />
        </NewsProvider>
    );
};

export default App;
