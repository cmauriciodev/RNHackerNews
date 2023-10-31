import { useState } from 'react';
import { DELETED_NEWS_STORAGE_KEY } from '../utils';
import useAsyncStorage from './useAsyncStorage';
import { Hit } from '../interfaces';

export const useDeletedNews = () => {
    const [isLoading, setisLoading] = useState(true);
    const [deletedNews, setDeletedNews] = useAsyncStorage<Hit[]>(
        DELETED_NEWS_STORAGE_KEY,
        [],
    );

    return {
        isLoading,
        deletedNews,
    };
};
