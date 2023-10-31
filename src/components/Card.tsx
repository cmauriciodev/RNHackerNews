import { View, Text, StyleSheet, Alert } from 'react-native';
import React from 'react';
import { Hit } from '../interfaces';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';
import { NewsStackParams } from '../navigation/NewsNavigator';
import { useConnection } from '../hooks';

interface Props extends Hit { }

export const Card = ({ story_title, author, created_at, story_url }: Props) => {
    const { navigate } = useNavigation<StackNavigationProp<NewsStackParams>>();
    const { isConnected } = useConnection();

    const onNavigateToNewArticle = () => {
        console.log(isConnected);

        if (!isConnected) {
            Alert.alert(
                'No internet connection',
                'Cannot open article without internet connection',
            );
            return;
        }
        navigate('ArticleScreen', { url: story_url, story_title });
    };

    return (
        <TouchableOpacity onPress={onNavigateToNewArticle}>
            <View style={styles.cardContainer}>
                <Text style={styles.cardTitle}>{story_title}</Text>
                <Text style={styles.cardData}>
                    {author} - {moment(created_at).fromNow()}{' '}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        minHeight: 100,
        justifyContent: 'center',
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    cardData: {
        fontSize: 14,
        color: 'grey',
        marginTop: 5,
    },
});
