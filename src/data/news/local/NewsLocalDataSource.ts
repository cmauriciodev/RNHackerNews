import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    DELETED_NEWS_STORAGE_KEY,
    NEWS_STORAGE_KEY,
} from '../../../model/constants';
import { INews } from '../../../model/interfaces';

export interface INewsLocalDataSource {
    getNews(): Promise<INews[]>;
    saveNewsOnStorage: (news: INews[]) => Promise<void>;
    getDeletedNews(): Promise<INews[]>;
    saveDeletedNewsOnStorage: (news: INews[]) => Promise<void>;
}

export class NewsLocalDataSource implements INewsLocalDataSource {
    /**
     * Retrieves news from async storage.
     * @returns {Promise<INews[]>} A promise that resolves to an array of INews objects.
     */
    async getNews(): Promise<INews[]> {
        const response = await AsyncStorage.getItem(NEWS_STORAGE_KEY);
        return JSON.parse(response || '[]');
    }

    /**
     * Saves an array of news on async storage.
     * @param news - The array of news to be saved.
     * @returns A Promise that resolves when the news have been saved.
     */
    async saveNewsOnStorage(news: INews[]) {
        await AsyncStorage.setItem(NEWS_STORAGE_KEY, JSON.stringify(news));
    }

    /**
     * Retrieves deleted news from async local.
     * @returns {Promise<INews[]>} A promise that resolves to an array of deleted news.
     */
    async getDeletedNews(): Promise<INews[]> {
        const response = await AsyncStorage.getItem(DELETED_NEWS_STORAGE_KEY);
        return JSON.parse(response || '[]');
    }

    /**
     * Saves deleted news on async storage.
     * @param news - The news to be saved.
     * @returns A Promise that resolves when the news is saved.
     */
    async saveDeletedNewsOnStorage(news: INews[]) {
        await AsyncStorage.setItem(
            DELETED_NEWS_STORAGE_KEY,
            JSON.stringify(news),
        );
    }
}
