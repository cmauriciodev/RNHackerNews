import React from 'react';
import { Alert, FlatList, RefreshControl, SafeAreaView } from 'react-native';
import { ListItem } from '../_components';
import { useConnection } from '../../hooks';
import { useFocusEffect } from '@react-navigation/native';
import { useNewsViewModel } from './HomeViewModel';

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
            Alert.alert(
                'No internet connection',
                'Cannot update news without internet connection',
            );
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
