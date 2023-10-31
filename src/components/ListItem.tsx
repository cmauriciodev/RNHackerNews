import {
    View,
    Text,
    StyleSheet,
    Alert,
    PanResponder,
    Animated,
} from 'react-native';
import React, { useRef } from 'react';
import { Hit } from '../interfaces';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';
import { NewsStackParams } from '../navigation/NewsNavigator';
import { useConnection } from '../hooks';
import { Swipeable, RectButton } from 'react-native-gesture-handler';

interface Props extends Hit {
    onDelete: (story_id: number) => void;
}

export const ListItem = ({
    story_title,
    author,
    created_at,
    story_url,
    story_id,
    onDelete,
}: Props) => {
    const { navigate } = useNavigation<StackNavigationProp<NewsStackParams>>();
    const { isConnected } = useConnection();

    const onNavigateToNewArticle = () => {
        if (!isConnected) {
            Alert.alert(
                'No internet connection',
                'Cannot open article without internet connection',
            );
            return;
        }
        navigate('ArticleScreen', { url: story_url, story_title });
    };

    const renderRightAction = (
        dragX: Animated.AnimatedInterpolation<string | number>,
    ) => {
        const trans = dragX.interpolate({
            inputRange: [0, 50, 100, 101],
            outputRange: [0, 0, 0, 1],
        });

        return (
            <Animated.View
                style={[
                    styles.rightAction,
                    { transform: [{ translateX: trans }] },
                ]}>
                <Text style={styles.actionText}>Delete</Text>
            </Animated.View>
        );
    };

    const handleSwipeableOpen = () => {
        onDelete(story_id);
    };

    return (
        <Swipeable
            onSwipeableOpen={handleSwipeableOpen}
            friction={2}
            rightThreshold={80}
            renderRightActions={renderRightAction}>
            {/* <TouchableOpacity onPress={onNavigateToNewArticle}> */}
            <Animated.View style={styles.cardContainer}>
                <Text style={styles.cardTitle}>{story_title}</Text>
                <Text style={styles.cardData}>
                    {author} - {moment(created_at).fromNow()}{' '}
                </Text>
            </Animated.View>
            {/* </TouchableOpacity> */}
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
        padding: 15,
        height: '100%',
    },
    actionText: {
        color: 'white',
        fontWeight: '600',
    },
});
