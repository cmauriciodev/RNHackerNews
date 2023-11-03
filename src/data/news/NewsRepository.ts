import AsyncStorage from '@react-native-async-storage/async-storage';
import { INews } from '../../model/interfaces';
import { DELETED_NEWS_STORAGE_KEY } from '../../model/constants';
import {
    INewsRemoteDataSource,
    NewsRemoteDataSource,
} from './remote/NewsRemoteDataSource';
import {
    INewsLocalDataSource,
    NewsLocalDataSource,
} from './local/NewsLocalDataSource';

export interface INewsRepository {
    getNews(): Promise<INews[]>;
    getDeletedNews(): Promise<INews[]>;
    deleteNews(news: INews): Promise<void>;
    restoreNews(news: INews): Promise<void>;
}

export class NewsRepository implements INewsRepository {
    private remote: INewsRemoteDataSource;
    private local: INewsLocalDataSource;

    constructor() {
        this.remote = new NewsRemoteDataSource();
        this.local = new NewsLocalDataSource();
    }

    /**
     * Retrieves news from the remote API and saves it locally.
     * If there's an error retrieving the news from the remote API, it retrieves the news from the local.
     * Filters out deleted news and saves the filtered news on the local.
     * @returns A Promise that resolves to an array of INews objects.
     */
    async getNews(): Promise<INews[]> {
        let newsData: INews[] = [];

        try {
            newsData = (await this.remote.getNews()).hits.map(hit => {
                return {
                    storyTitle: hit.story_title,
                    author: hit.author,
                    storyUrl: hit.story_url,
                    createdAt: hit.created_at,
                    objectID: hit.objectID,
                };
            });
        } catch (error) {
            newsData = await this.local.getNews();
        }

        const deletedNews = await this.local.getDeletedNews();

        const filteredNews = newsData
            .filter(
                post =>
                    post.storyTitle &&
                    post.author &&
                    post.storyUrl &&
                    post.createdAt,
            )
            .filter(
                post =>
                    !deletedNews.find(
                        deletedPost => deletedPost.objectID === post.objectID,
                    ),
            );

        await this.local.saveNewsOnStorage(filteredNews);

        return filteredNews;
    }

    /**
     * Retrieves deleted news from local and sorts them by creation date in descending order.
     * @returns {Promise<INews[]>} A promise that resolves to an array of INews objects representing the deleted news.
     */
    async getDeletedNews(): Promise<INews[]> {
        const data = await this.local.getDeletedNews();

        const sortedData: INews[] = data.sort(
            (a: INews, b: INews) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime(),
        );

        return sortedData;
    }

    /**
     * Deletes a news item from the local.
     * @param newsItem - The news item to be deleted.
     * @returns A Promise that resolves when the news item is deleted.
     */
    async deleteNews(newsItem: INews): Promise<void> {
        const deletedNews = await this.local.getDeletedNews();
        deletedNews.push(newsItem);
        await this.local.saveDeletedNewsOnStorage(deletedNews);
    }

    /**
     * Restores a deleted news item by removing it from the list of deleted news items.
     * @param newsItem - The news item to be restored.
     * @returns A Promise that resolves when the news item has been successfully restored.
     */
    async restoreNews(newsItem: INews): Promise<void> {
        const deletedNews = await this.getDeletedNews();
        const filteredNews = deletedNews.filter(
            deletedNewsItem => deletedNewsItem.objectID !== newsItem.objectID,
        );
        await this.local.saveDeletedNewsOnStorage(filteredNews);
    }
}
