import { FlatList, RefreshControl } from 'react-native';
import React from 'react';
import { usePosts } from '../hooks/usePosts';
import { Card } from '../components/Card';

export const Home = () => {
    const { postsData, isLoading, onRefresh } = usePosts();

    return (
        <FlatList
            showsVerticalScrollIndicator={false}
            data={postsData}
            keyExtractor={post => post.objectID}
            renderItem={({ item, index }) => <Card key={index} {...item} />}
            refreshControl={
                <RefreshControl
                    refreshing={isLoading}
                    onRefresh={onRefresh}
                    progressViewOffset={10}
                    title="Getting posts"
                />
            }
        />
    );
};
