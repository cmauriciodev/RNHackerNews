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

        const posts = resp.data.hits.filter(
            post =>
                post.story_title &&
                post.author &&
                post.story_url &&
                post.created_at,
        );

        setPostsData(posts);
        setisLoading(false);
    };

    const onRefresh = () => {
        setisLoading(true);
        loadPosts();
    };

    useEffect(() => {
        loadPosts();
    }, []);

    return {
        isLoading,
        postsData,
        onRefresh,
    };
};
