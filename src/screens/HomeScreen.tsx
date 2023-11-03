import React from 'react';
import { FlatList, RefreshControl, SafeAreaView } from 'react-native';
import { ListItem } from '../components';
import { useConnection, useNewsViewModel } from '../hooks';
import { useFocusEffect } from '@react-navigation/native';

export const HomeScreen = () => {
    const { news, loadNews, isLoading, deleteNews } = useNewsViewModel();
    const { isConnected } = useConnection();

    useFocusEffect(
        React.useCallback(() => {
            loadNews();
        }, []),
    );

    const onRefresh = () => {
        if (!isConnected) {
            return;
        }
        loadNews();
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={news}
                keyExtractor={post => post.objectID}
                renderItem={({ item, index }) => (
                    <ListItem
                        key={index}
                        onSwipe={deleteNews}
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
        </SafeAreaView>
    );
};
