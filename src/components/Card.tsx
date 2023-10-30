import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Hit } from '../interfaces';
import moment from 'moment';

interface Props extends Hit { }

export const Card = ({ story_title, author, created_at }: Props) => {
    return (
        <View style={styles.cardContainer}>
            <Text style={styles.cardTitle}>{story_title}</Text>
            <Text style={styles.cardData}>
                {author} - {moment(created_at).fromNow()}{' '}
            </Text>
        </View>
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
