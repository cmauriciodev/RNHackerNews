import { INews } from '../../model/interfaces';

export interface INewsRepository {
    getNews(): Promise<INews[]>;
    getDeletedNews(): Promise<INews[]>;
    deleteNews(news: INews): Promise<void>;
    restoreNews(news: INews): Promise<void>;
}