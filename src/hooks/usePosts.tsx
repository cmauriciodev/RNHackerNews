import { useEffect, useState } from 'react';
import { hackerNewsApi } from '../api/hackerNewsApi';
import { HackerNewsResponse, Hit } from '../interfaces';

export const usePosts = () => {
    const [isLoading, setisLoading] = useState(true);
    const [postsData, setPostsData] = useState<Hit[]>();

    const loadPosts = async () => {
        const resp = await hackerNewsApi.get<HackerNewsResponse>(
            '/search_by_date?query=mobile',
        );
        setPostsData(resp.data.hits);
        setisLoading(false);
    };

    useEffect(() => {
        loadPosts();
    }, []);

    return {
        isLoading,
        postsData,
    };
};
