import { View, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import WebView from 'react-native-webview';
import { NewsStackParams } from '../navigation/NewsNavigator';
import { StackScreenProps } from '@react-navigation/stack';

interface Props extends StackScreenProps<NewsStackParams, 'ArticleScreen'> { }

export const ArticleScreen = ({ route, navigation }: Props) => {
    const { url, story_title } = route.params;

    useEffect(() => {
        navigation.setOptions({
            title: story_title || '',
        });
    }, [story_title]);

    return (
        <View style={styles.container}>
            <WebView source={{ uri: url }} style={{ flex: 1 }} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
