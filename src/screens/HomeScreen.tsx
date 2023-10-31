import { FlatList, RefreshControl } from 'react-native';
import React from 'react';
import { ListItem } from '../components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNews } from '../hooks';

export const HomeScreen = () => {
    const { news, isLoading, onRefresh } = useNews();

    const onDeleteItem = (story_id: number) => {
        console.log('Delete item with id: ', story_id);
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={news}
                keyExtractor={post => post.objectID}
                renderItem={({ item, index }) => (
                    <ListItem key={index} onDelete={onDeleteItem} {...item} />
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
