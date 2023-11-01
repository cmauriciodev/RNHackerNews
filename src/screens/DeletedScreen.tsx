import React from 'react';
import { FlatList, SafeAreaView } from 'react-native';
import { ListItem } from '../components';
import { useNewsContext } from '../context/NewsContext';

export const DeletedScreen = () => {
    const { deletedNews, restoreDeletedNews } = useNewsContext();

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={deletedNews}
                keyExtractor={post => post.objectID}
                renderItem={({ item, index }) => (
                    <ListItem
                        key={index}
                        onSwipe={restoreDeletedNews}
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
