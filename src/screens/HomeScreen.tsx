import React from 'react';
import { FlatList, RefreshControl, SafeAreaView, Text } from 'react-native';
import { ListItem } from '../components';
import { useNewsContext } from '../context/NewsContext';

export const HomeScreen = () => {
    const { news, loadNews, isLoading, addNewToDeletedNews } = useNewsContext();

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
                            onRefresh={loadNews}
                            progressViewOffset={10}
                            title="Getting posts..."
                        />
                    }
                />
            )}
        </SafeAreaView>
    );
};
