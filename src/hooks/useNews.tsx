import { useEffect, useState } from 'react';
import { hackerNewsApi } from '../api/hackerNewsApi';
import { HackerNewsResponse, Hit } from '../interfaces';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NEWS_STORAGE_KEY } from '../utils';

export const useNews = () => {
    const [isLoading, setisLoading] = useState(true);
    const [news, setNews] = useState<Hit[]>();

    const loadNews = async () => {
        try {
            const resp = await hackerNewsApi.get<HackerNewsResponse>(
                '/search_by_date?query=mobile',
            );

            const newsData = resp.data.hits.filter(
                post =>
                    post.story_title &&
                    post.author &&
                    post.story_url &&
                    post.created_at,
            );

            setNews(newsData);
            savePostsOnStorage(newsData);
            setisLoading(false);
        } catch (error) {
            const newsData = await AsyncStorage.getItem(NEWS_STORAGE_KEY);
            setNews(newsData ? JSON.parse(newsData) : []);
            setisLoading(false);
        }
    };

    const savePostsOnStorage = async (newsData: Hit[]) => {
        try {
            await AsyncStorage.setItem(
                NEWS_STORAGE_KEY,
                JSON.stringify(newsData),
            );
        } catch (error) {
            console.log(error);
        }
    };

    const onRefresh = () => {
        setisLoading(true);
        loadNews();
    };

    useEffect(() => {
        loadNews();
    }, []);

    return {
        isLoading,
        news,
        onRefresh,
    };
};
