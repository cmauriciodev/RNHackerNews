import { useEffect, useState } from 'react';
import { hackerNewsApi } from '../api/hackerNewsApi';
import { HackerNewsResponse, Hit } from '../interfaces';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { POSTS_STORAGE_KEY } from '../utils';

export const usePosts = () => {
    const [isLoading, setisLoading] = useState(true);
    const [postsData, setPostsData] = useState<Hit[]>();

    const loadPosts = async () => {
        try {
            const resp = await hackerNewsApi.get<HackerNewsResponse>(
                '/search_by_date?query=mobile',
            );

            const posts = resp.data.hits.filter(
                post =>
                    post.story_title &&
                    post.author &&
                    post.story_url &&
                    post.created_at,
            );

            setPostsData(posts);
            savePostsOnStorage(posts);
            setisLoading(false);
        } catch (error) {
            const posts = await AsyncStorage.getItem(POSTS_STORAGE_KEY);
            setPostsData(posts ? JSON.parse(posts) : []);
            setisLoading(false);
        }
    };

    const savePostsOnStorage = async (posts: Hit[]) => {
        try {
            await AsyncStorage.setItem(
                POSTS_STORAGE_KEY,
                JSON.stringify(posts),
            );
        } catch (error) {
            console.log(error);
        }
    };

    const onRefresh = () => {
        setisLoading(true);
        loadPosts();
    };

    useEffect(() => {
        loadPosts();
    }, []);

    return {
        isLoading,
        postsData,
        onRefresh,
    };
};
