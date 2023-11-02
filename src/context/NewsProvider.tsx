import React, { useEffect } from 'react';
import { NewsContext } from './NewsContext';
import { HackerNewsResponse, Hit } from '../interfaces';
import { hackerNewsApi } from '../api/hackerNewsApi';
import { DELETED_NEWS_STORAGE_KEY, NEWS_STORAGE_KEY } from '../utils';
import { useAsyncStorage } from '../hooks';
import { Alert } from 'react-native';

export const NewsProvider = ({ children }: { children: React.ReactNode }) => {
    const [news, setNews, newsLoading] = useAsyncStorage<Hit[]>(
        NEWS_STORAGE_KEY,
        [],
    );
    const [deletedNews, setDeletedNews, deletedNewsLoading] = useAsyncStorage<
        Hit[]
    >(DELETED_NEWS_STORAGE_KEY, []);

    useEffect(() => {
        if (!newsLoading && !deletedNewsLoading) {
            loadNews();
        }
    }, []);

    const loadNews = async () => {
        try {
            const resp = await hackerNewsApi.get<HackerNewsResponse>(
                '/search_by_date?query=mobile',
            );

            const responseData = resp.data.hits
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
                            deletedPost =>
                                deletedPost.objectID === post.objectID,
                        ),
                );

            await setNews(responseData);
        } catch (error) {
            Alert.alert(
                'No internet connection',
                'Cannot update articles without internet connection',
            );
            console.error(error);
        }
    };

    const addNewToDeletedNews = async (objectID: string) => {
        const deletedNew = news.find(post => post.objectID === objectID);
        await setDeletedNews([...deletedNews, deletedNew!]);

        const filteredNews = news.filter(post => post.objectID !== objectID);
        await setNews(filteredNews);
    };

    const restoreDeletedNews = async (objectID: string) => {
        const filteredDeletedNews = deletedNews.filter(
            post => post.objectID !== objectID,
        );

        await setDeletedNews(filteredDeletedNews);

        const restoredNew = deletedNews.find(
            post => post.objectID === objectID,
        );

        if (!restoredNew) {
            return;
        }

        const updatedNews = [...news, restoredNew];
        updatedNews.sort(
            (a, b) =>
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime(),
        );

        await setNews(updatedNews);
    };

    return (
        <NewsContext.Provider
            value={{
                news,
                deletedNews,
                isLoading: newsLoading || deletedNewsLoading,
                loadNews,
                addNewToDeletedNews,
                restoreDeletedNews,
            }}>
            {children}
        </NewsContext.Provider>
    );
};
