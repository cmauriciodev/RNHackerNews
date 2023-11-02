import React from 'react';
import { FlatList, RefreshControl, SafeAreaView, Text } from 'react-native';
import { ListItem } from '../components';
import { useNewsContext } from '../context/NewsContext';
import { useConnection } from '../hooks';

export const HomeScreen = () => {
    const { news, loadNews, isLoading, addNewToDeletedNews } = useNewsContext();
    const { isConnected } = useConnection();

    const onRefresh = () => {
        if (!isConnected) {
            return;
        }
        loadNews();
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {isLoading ? (
                <Text>Loading...</Text>
            ) : (
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={news}
                    keyExtractor={post => post.objectID}
                    renderItem={({ item, index }) => (
                        <ListItem
                            key={index}
                            onSwipe={addNewToDeletedNews}
                            item={item}
                            swipeOptions={{
                                color: 'red',
                                text: 'Delete',
                            }}
                        />
                    )}
                    refreshControl={
                        <RefreshControl
                            refreshing={isLoading}
                            onRefresh={onRefresh}
                            progressViewOffset={10}
                            title="Getting posts..."
                        />
                    }
                />
            )}
        </SafeAreaView>
    );
};
