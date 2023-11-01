import React from 'react';
import { FlatList, SafeAreaView } from 'react-native';
import { ListItem } from '../components';
import { useNewsContext } from '../context/NewsContext';

export const DeletedScreen = () => {
    const { deletedNews, removeNewFromDeletedNews } = useNewsContext();

    const onRemoveFromDeleted = (story_id: number) => {
        removeNewFromDeletedNews(story_id);
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={deletedNews}
                keyExtractor={post => post.objectID}
                renderItem={({ item, index }) => (
                    <ListItem
                        key={index}
                        onSwipe={onRemoveFromDeleted}
                        item={item}
                        swipeOptions={{
                            color: 'green',
                            text: 'Restore',
                        }}
                    />
                )}
            />
        </SafeAreaView>
    );
};
