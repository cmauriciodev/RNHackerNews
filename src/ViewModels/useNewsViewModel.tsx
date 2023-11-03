import { useState } from 'react';
import { NewsRepository } from '../repositories/NewsRepository';
import { INews } from '../model/interfaces';

export const useNewsViewModel = () => {
    const newsRepository = new NewsRepository();
    const [news, setNews] = useState<INews[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const loadNews = async () => {
        setIsLoading(true);
        const newsFromRepo = await newsRepository.getNews();
        setNews(newsFromRepo);
        setIsLoading(false);
    };

    const deleteNews = async (objectID: string) => {
        const newsToDelete = news.find(post => post.objectID === objectID);
        newsRepository.deleteNews(newsToDelete!);

        const filteredNews = news.filter(post => post.objectID !== objectID);
        setNews(filteredNews);
    };

    return { news, loadNews, deleteNews, isLoading };
};
