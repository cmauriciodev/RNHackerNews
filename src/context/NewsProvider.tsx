import React, { useEffect, useState } from 'react';
import { NewsContext } from './NewsContext';
import { HackerNewsResponse, Hit } from '../interfaces';
import { hackerNewsApi } from '../api/hackerNewsApi';
// import { DELETED_NEWS_STORAGE_KEY, NEWS_STORAGE_KEY } from '../utils';
// import { useAsyncStorage } from '../hooks';

export const NewsProvider = ({ children }: { children: React.ReactNode }) => {
    const [news, setNews] = useState<Hit[]>([]);
    const [deletedNews, setDeletedNews] = useState<Hit[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const loadNews = async () => {
        setIsLoading(true);
        try {
            const resp = await hackerNewsApi.get<HackerNewsResponse>(
                '/search_by_date?query=mobile',
            );

            const responseData = resp.data.hits.filter(
                post =>
                    post.story_title &&
                    post.author &&
                    post.story_url &&
                    post.created_at,
            );

            setNews(responseData);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const addNewToDeletedNews = (story_id: number) => {
        const deletedNew = news.find(post => post.story_id === story_id);
        setDeletedNews([...deletedNews, deletedNew!]);

        const filteredNews = news.filter(post => post.story_id !== story_id);
        setNews(filteredNews);
    };

    const removeNewFromDeletedNews = (story_id: number) => {
        const filteredDeletedNews = deletedNews.filter(
            post => post.story_id !== story_id,
        );
        setDeletedNews(filteredDeletedNews);
    };

    useEffect(() => {
        loadNews();
    }, []);

    return (
        <NewsContext.Provider
            value={{
                news,
                deletedNews,
                isLoading,
                loadNews,
                addNewToDeletedNews,
                removeNewFromDeletedNews,
            }}>
            {children}
        </NewsContext.Provider>
    );
};
