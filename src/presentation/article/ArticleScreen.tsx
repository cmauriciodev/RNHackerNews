import { View, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import WebView from 'react-native-webview';
import { StackScreenProps } from '@react-navigation/stack';
import { NewsStackParams } from '../../navigation/NewsNavigator';

interface Props extends StackScreenProps<NewsStackParams, 'ArticleScreen'> { }

export const ArticleScreen = ({ route, navigation }: Props) => {
    const { url, storyTitle } = route.params;

    useEffect(() => {
        navigation.setOptions({
            title: storyTitle || '',
        });
    }, [navigation, storyTitle]);

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
