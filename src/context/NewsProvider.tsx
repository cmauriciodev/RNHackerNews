import React, { useEffect, useState } from 'react';
import { NewsContext } from './NewsContext';
import { HackerNewsResponse, Hit } from '../interfaces';
import { hackerNewsApi } from '../api/hackerNewsApi';
import { DELETED_NEWS_STORAGE_KEY, NEWS_STORAGE_KEY } from '../utils';
import { useAsyncStorage } from '../hooks';

export const NewsProvider = ({ children }: { children: React.ReactNode }) => {
    const [news, setNews] = useAsyncStorage<Hit[]>(NEWS_STORAGE_KEY, []);
    const [deletedNews, setDeletedNews] = useAsyncStorage<Hit[]>(
        DELETED_NEWS_STORAGE_KEY,
        [],
    );
    const [isLoading, setIsLoading] = useState(false);

    const loadNews = async () => {
        setIsLoading(true);
        try {
            const resp = await hackerNewsApi.get<HackerNewsResponse>(
                '/search_by_date?query=mobile',
            );

            const newsData = resp.data.hits
                .filter(
                    post =>
                        post.story_title &&
                        post.author &&
                        post.story_url &&
                        post.created_at,
                )
                .filter(
                    post =>
                        !deletedNews.find(
                            deleted => deleted.story_id === post.story_id,
                        ),
                );

            console.log(resp.data.hits.map(deleted => deleted.story_id));

            console.log(deletedNews.map(deleted => deleted.story_id));

            console.log(newsData.map(deleted => deleted.story_id));

            // setNews(newsData);
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

        loadNews(); //TODO: Improve this to avoid calling the API again
    };

    const onRefresh = () => {
        loadNews();
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
                onRefresh,
            }}>
            {children}
        </NewsContext.Provider>
    );
};
