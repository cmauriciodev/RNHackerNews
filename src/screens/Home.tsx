import { View, Text } from 'react-native';
import React from 'react';
import { usePosts } from '../hooks/usePosts';

export const Home = () => {
    const { postsData } = usePosts();

    console.log(postsData);

    return (
        <View>
            <Text>Home</Text>

            {postsData?.map(post => (
                <Text key={post.objectID}>{post.story_title}</Text>
            ))}
        </View>
    );
};
