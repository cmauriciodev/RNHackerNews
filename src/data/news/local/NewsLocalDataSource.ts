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
    async getNews(): Promise<INews[]> {
        const response = await AsyncStorage.getItem(NEWS_STORAGE_KEY);
        return JSON.parse(response || '[]');
    }

    async saveNewsOnStorage(news: INews[]) {
        await AsyncStorage.setItem(NEWS_STORAGE_KEY, JSON.stringify(news));
    }

    async getDeletedNews(): Promise<INews[]> {
        const response = await AsyncStorage.getItem(DELETED_NEWS_STORAGE_KEY);
        return JSON.parse(response || '[]');
    }

    async saveDeletedNewsOnStorage(news: INews[]) {
        await AsyncStorage.setItem(
            DELETED_NEWS_STORAGE_KEY,
            JSON.stringify(news),
        );
    }
}
