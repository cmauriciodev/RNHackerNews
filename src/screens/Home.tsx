import { FlatList, ActivityIndicator } from 'react-native';
import React from 'react';
import { usePosts } from '../hooks/usePosts';
import { Card } from '../components/Card';

export const Home = () => {
    const { postsData } = usePosts();

    console.log(postsData);

    return (
        <FlatList
            showsVerticalScrollIndicator={false}
            data={postsData}
            keyExtractor={post => post.objectID}
            renderItem={({ item, index }) => <Card key={index} {...item} />}
            ListHeaderComponent={<ActivityIndicator size={20} color="grey" />}
        />
    );
};
