import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import { hackerNewsApi } from '../../api/hackerNewsApi';
import { HackerNewsResponse, INews } from '../../interfaces';
import { DELETED_NEWS_STORAGE_KEY, NEWS_STORAGE_KEY } from '../../utils';
import { INewsRepository } from './news-repository.interface';

export class NewsRepository implements INewsRepository {
    /**
     * Fetches news from the API and returns an array of filtered and mapped news objects.
     * If the API call fails, it returns an array of news from async storage.
     * @returns {Promise<INews[]>} An array of news objects.
     */
    async getNews(): Promise<INews[]> {
        try {
            const resp = await hackerNewsApi.get<HackerNewsResponse>(
                '/search_by_date?query=mobile',
            );

            const deletedNews = await this.getDeletedNews();

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
                )
                .map(post => {
                    return {
                        storyTitle: post.story_title,
                        author: post.author,
                        storyUrl: post.story_url,
                        createdAt: moment(post.created_at).fromNow(),
                        objectID: post.objectID,
                    };
                });

            return responseData;
        } catch (error) {
            const data = await AsyncStorage.getItem(NEWS_STORAGE_KEY);
            const deletedNews = await this.getDeletedNews();
            const filteredNews = JSON.parse(data || '[]').filter(
                (news: INews) =>
                    !deletedNews.find(
                        deletedNewsItem =>
                            deletedNewsItem.objectID === news.objectID,
                    ),
            );

            return JSON.parse(filteredNews || '[]') as INews[];
        }
    }

    /**
     * Retrieves deleted news from AsyncStorage.
     * @returns {Promise<INews[]>} A promise that resolves to an array of INews objects representing the deleted news.
     */
    async getDeletedNews(): Promise<INews[]> {
        const data = await AsyncStorage.getItem(DELETED_NEWS_STORAGE_KEY);
        return JSON.parse(data || '[]') as INews[];
    }

    /**
     * Add news to the deletedNews Storage.
     * @param news The news item to be deleted.
     * @returns A Promise that resolves when the news item has been deleted.
     */
    async deleteNews(news: INews): Promise<void> {
        const deletedNews = await this.getDeletedNews();
        deletedNews.push(news);
        await AsyncStorage.setItem(
            DELETED_NEWS_STORAGE_KEY,
            JSON.stringify(deletedNews),
        );
    }

    /**
     * Restores a deleted news item by removing it from the list of deleted news items stored in AsyncStorage.
     * @param news - The news item to restore.
     * @returns A Promise that resolves when the news item has been successfully restored.
     */
    async restoreNews(news: INews): Promise<void> {
        const deletedNews = await this.getDeletedNews();
        const filteredNews = deletedNews.filter(
            deletedNewsItem => deletedNewsItem.objectID !== news.objectID,
        );
        await AsyncStorage.setItem(
            DELETED_NEWS_STORAGE_KEY,
            JSON.stringify(filteredNews),
        );
    }
}
