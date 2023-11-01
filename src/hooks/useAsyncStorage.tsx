import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

export const useAsyncStorage = <T,>(
    key: string,
    initialValue: T,
): [T, (value: T) => Promise<void>, isLoading: boolean] => {
    const [storedValue, setStoredValue] = useState(initialValue);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getStoredValue = async () => {
            try {
                const item = (await AsyncStorage.getItem(key)) || '';
                setStoredValue(JSON.parse(item));
                setIsLoading(false);
            } catch (error) {
                console.error(error);
                setIsLoading(false);
            }
        };

        getStoredValue();
    }, [key]);

    const setValue = async (value: T) => {
        try {
            setStoredValue(value);
            await AsyncStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error(error);
        }
    };

    return [storedValue, setValue, isLoading];
};
