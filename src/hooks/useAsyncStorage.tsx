import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useAsyncStorage = (key, initialValue) => {
    const [storedValue, setStoredValue] = useState(initialValue);

    // Load from storage
    useEffect(() => {
        (async () => {
            try {
                const value = await AsyncStorage.getItem(key);
                value !== null
                    ? setStoredValue(JSON.parse(value))
                    : initialValue;
            } catch (error) {
                console.error(error);
            }
        })();
    }, [key, initialValue]);

    // Save to storage
    const setValue = async value => {
        try {
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            await AsyncStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error(error);
        }
    };

    // Remove from storage
    const removeValue = async () => {
        try {
            await AsyncStorage.removeItem(key);
            setStoredValue(null);
        } catch (error) {
            console.error(error);
        }
    };

    return [storedValue, setValue, removeValue];
};
