import { useEffect, useState } from 'react';
import { hackerNewsApi } from '../api/hackerNewsApi';
import { HackerNewsResponse, Hit } from '../interfaces';
import { NEWS_STORAGE_KEY } from '../utils';
import useAsyncStorage from './useAsyncStorage';

export const useNews = () => {
    const [isLoading, setisLoading] = useState(true);
    const [news, setNews] = useAsyncStorage<Hit[]>(NEWS_STORAGE_KEY, []);

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
            setisLoading(false);
        } catch (error) {
            setisLoading(false);
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
