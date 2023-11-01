import { createContext, useContext } from 'react';
import { NewsContextProps } from './NewsState';

export const NewsContext = createContext({} as NewsContextProps);

export const useNewsContext = () => {
    const context = useContext(NewsContext);
    if (context === undefined) {
        throw new Error(
            'useNewsContext must be used within a FavoriteProvider',
        );
    }
    return context;
};
