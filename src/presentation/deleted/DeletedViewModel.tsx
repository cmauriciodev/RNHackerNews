import { useState } from 'react';
import { INews } from '../../model/interfaces';
import { NewsRepository } from '../../data/news';

export const useDeletedNewsViewModel = () => {
    const newsRepository = new NewsRepository();
    const [deletedNews, setDeletedNews] = useState<INews[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const loadDeletedNews = async () => {
        setIsLoading(true);
        const deletedNewsFromRepo = await newsRepository.getDeletedNews();
        setDeletedNews(deletedNewsFromRepo);
        setIsLoading(false);
    };

    const restoreNews = async (objectID: string) => {
        const newsToRestore = deletedNews.find(
            post => post.objectID === objectID,
        );
        newsRepository.restoreNews(newsToRestore!);

        const filteredNews = deletedNews.filter(
            post => post.objectID !== objectID,
        );
        setDeletedNews(filteredNews);
    };

    return { deletedNews, loadDeletedNews, restoreNews, isLoading };
};
