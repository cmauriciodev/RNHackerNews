import { FlatList, RefreshControl } from 'react-native';
import React from 'react';
import { usePosts } from '../hooks/usePosts';
import { Card } from '../components/Card';
import { useConnection } from '../hooks/useConnection';
import { SafeAreaView } from 'react-native-safe-area-context';

export const Home = () => {
    const { postsData, isLoading, onRefresh } = usePosts();
    const { isConnected } = useConnection();

    return (
        <SafeAreaView>
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
                        title="Getting posts..."
                    />
                }
            />
        </SafeAreaView>
    );
};
