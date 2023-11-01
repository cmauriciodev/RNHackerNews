import React from 'react';
import { FlatList, RefreshControl, SafeAreaView } from 'react-native';
import { ListItem } from '../components';
import { useNewsContext } from '../context/NewsContext';

export const HomeScreen = () => {
    const { news, onRefresh, isLoading, addNewToDeletedNews } =
        useNewsContext();

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
