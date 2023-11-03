import React from 'react';
import { Text, StyleSheet, Alert, Animated, Pressable } from 'react-native';
import { INews } from '../../model/interfaces';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { NewsStackParams } from '../_navigation/NewsNavigator';
import { useConnection } from '../../utils/hooks';
import { Swipeable } from 'react-native-gesture-handler';
import moment from 'moment';

interface Props {
    item: INews;
    swipeOptions: {
        color: string;
        text: string;
    };
    onSwipe: (objectID: string) => void;
}

export const ListItem = ({ onSwipe, item, swipeOptions }: Props) => {
    const { navigate } = useNavigation<StackNavigationProp<NewsStackParams>>();
    const { isConnected } = useConnection();

    const { storyTitle, author, createdAt, storyUrl, objectID } = item;

    const onNavigateToNewArticle = () => {
        if (!isConnected) {
            Alert.alert(
                'No internet connection',
                'Cannot open article without internet connection',
            );
            return;
        }
        navigate('ArticleScreen', { url: storyUrl, storyTitle });
    };

    const renderRightAction = (
        dragX: Animated.AnimatedInterpolation<string | number>,
    ) => {
        const trans = dragX.interpolate({
            inputRange: [-20, 50, 150, 200],
            outputRange: [0, 0, 0, 1],
        });

        return (
            <Animated.View
                style={[
                    styles.rightAction,
                    { transform: [{ translateX: trans }] },
                    { backgroundColor: swipeOptions.color },
                ]}>
                <Text style={styles.actionText}>{swipeOptions.text}</Text>
            </Animated.View>
        );
    };

    const handleSwipeableOpen = () => {
        onSwipe(objectID);
    };

    return (
        <Swipeable
            onSwipeableOpen={handleSwipeableOpen}
            friction={3}
            overshootRight={false}
            rightThreshold={100}
            renderRightActions={renderRightAction}>
            <Pressable onPress={onNavigateToNewArticle}>
                <Animated.View style={styles.cardContainer}>
                    <Text style={styles.cardData}>{objectID}</Text>
                    <Text style={styles.cardTitle}>{storyTitle}</Text>
                    <Text style={styles.cardData}>
                        {author} - {moment(createdAt).fromNow()}
                    </Text>
                </Animated.View>
            </Pressable>
        </Swipeable>
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
        backgroundColor: 'white',
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
    rightAction: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'flex-end',
        padding: 20,
        height: '100%',
    },
    actionText: {
        color: 'white',
        fontWeight: '600',
    },
});
