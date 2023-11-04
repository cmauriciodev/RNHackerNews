import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text } from 'react-native';
import { ListItem } from '../_components';
import { useFocusEffect } from '@react-navigation/native';
import { useDeletedNewsViewModel } from './DeletedViewModel';

export const DeletedScreen = () => {
    const { deletedNews, loadDeletedNews, restoreNews } =
        useDeletedNewsViewModel();

    useFocusEffect(
        React.useCallback(() => {
            loadDeletedNews();
        }, []),
    );

    return (
        <SafeAreaView style={styles.container}>
            {deletedNews.length === 0 ? (
                <Text style={styles.noNewsLabel}>No deleted news</Text>
            ) : (
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
                />
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
    },
    noNewsLabel: {
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
    },
});
