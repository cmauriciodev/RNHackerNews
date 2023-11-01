import { Hit } from '../interfaces';

export interface NewsState {
    news: Hit[];
    deletedNews: Hit[];
    isLoading: boolean;
}

export interface NewsContextProps extends NewsState {
    loadNews: () => void;
    addNewToDeletedNews: (story_id: number) => void;
    removeNewFromDeletedNews: (story_id: number) => void;
    onRefresh: () => void;
}
