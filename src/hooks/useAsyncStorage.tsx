import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useAsyncStorage = <T,>(
    key: string,
    initialValue: T,
): [T, (value: T) => Promise<void>] => {
    const [storedValue, setStoredValue] = useState<T>(initialValue);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem(key);
            value !== null
                ? setStoredValue(JSON.parse(value) as T)
                : initialValue;
        } catch (error) {
            console.log(error);
        }
    };

    const setData = async (value: T) => {
        try {
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            await AsyncStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.log(error);
        }
    };

    return [storedValue, setData];
};

export default useAsyncStorage;
