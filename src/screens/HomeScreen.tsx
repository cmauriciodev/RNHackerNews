import { FlatList, RefreshControl } from 'react-native';
import React from 'react';
import { Card } from '../components/Card';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNews } from '../hooks';

export const HomeScreen = () => {
    const { news, isLoading, onRefresh } = useNews();

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={news}
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
