import { Hit } from '../interfaces';

export interface NewsState {
    news: Hit[];
    deletedNews: Hit[];
    isLoading: boolean;
}

export interface NewsContextProps extends NewsState {
    loadNews: () => void;
    addNewToDeletedNews: (objectID: string) => void;
    restoreDeletedNews: (objectID: string) => void;
}
