import { useEffect, useState } from 'react';
import { hackerNewsApi } from '../api/hackerNewsApi';
import { HackerNewsResponse, Hit } from '../interfaces';
import { DELETED_NEWS_STORAGE_KEY, NEWS_STORAGE_KEY } from '../utils';
import useAsyncStorage from './useAsyncStorage';

export const useNews = () => {
    const [isLoading, setisLoading] = useState(true);
    const [news, setNews] = useAsyncStorage<Hit[]>(NEWS_STORAGE_KEY, []);
    const [deletedNews, setDeletedNews] = useAsyncStorage<Hit[]>(
        DELETED_NEWS_STORAGE_KEY,
        [],
    );

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

    const addNewToDeletedNews = (story_id: number) => {
        const newData = news.find(post => post.story_id === story_id);
        const newsUpdated = news.filter(post => post.story_id !== story_id);

        if (newData) {
            setDeletedNews([...deletedNews, newData]);
            setNews(newsUpdated);
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
        deletedNews,
        addNewToDeletedNews,
        onRefresh,
    };
};
