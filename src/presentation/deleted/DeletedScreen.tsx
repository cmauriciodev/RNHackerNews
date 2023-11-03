import React from 'react';
import { FlatList, SafeAreaView } from 'react-native';
import { ListItem } from '../_components';
import { RefreshControl } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';
import { useDeletedNewsViewModel } from './DeletedViewModel';

export const DeletedScreen = () => {
    const { deletedNews, loadDeletedNews, isLoading, restoreNews } =
        useDeletedNewsViewModel();

    useFocusEffect(
        React.useCallback(() => {
            loadDeletedNews();
        }, []),
    );

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={deletedNews}
                keyExtractor={post => post.objectID}
                renderItem={({ item, index }) => (
                    <ListItem
                        key={index}
                        onSwipe={restoreNews}
                        item={item}
                        swipeOptions={{
                            color: 'green',
                            text: 'Restore',
                        }}
                    />
                )}
                refreshControl={
                    <RefreshControl
                        refreshing={isLoading}
                        onRefresh={loadDeletedNews}
                        progressViewOffset={10}
                        title="Getting posts..."
                    />
                }
            />
        </SafeAreaView>
    );
};
