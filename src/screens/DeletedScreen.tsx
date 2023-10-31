import React from 'react';
import { FlatList, SafeAreaView } from 'react-native';
import { ListItem } from '../components';
import { useNews } from '../hooks';

export const DeletedScreen = () => {
    const { deletedNews } = useNews();

    console.log(deletedNews.length);

    const onRemoveFromDeleted = (story_id: number) => {
        console.log('Remove item with id: ', story_id);
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
