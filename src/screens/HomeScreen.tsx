import React from 'react';
import { FlatList, RefreshControl, SafeAreaView } from 'react-native';
import { ListItem } from '../components';
import { useNews } from '../hooks';

export const HomeScreen = () => {
    const { news, isLoading, onRefresh, addNewToDeletedNews } = useNews();

    const onDeleteItem = (story_id: number) => {
        addNewToDeletedNews(story_id);
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
                        onSwipe={onDeleteItem}
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
