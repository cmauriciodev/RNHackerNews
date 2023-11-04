import { hackerNewsApi } from '../../../utils/api/hackerNewsApi';
import { HackerNewsResponse } from '../../../model/interfaces';

export interface INewsRemoteDataSource {
    getNews(): Promise<HackerNewsResponse>;
}

export class NewsRemoteDataSource implements INewsRemoteDataSource {
    /**
     * Fetches news from the Hacker News API.
     * @returns A Promise that resolves to the response data from the API.
     */
    async getNews() {
        const response = await hackerNewsApi.get<HackerNewsResponse>(
            '/search_by_date?query=mobile',
        );
        return response.data;
    }
}
