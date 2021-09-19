import { useState, useLayoutEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

function useAsyncStorage<T>(key: string, initialValue: T): [T, (value: any) => Promise<void>] {
    const [storedValue, setStoredValue] = useState(initialValue);

    async function getStoredItem() {
        try {
            // Get from local storage by key
            const item: string | null = await AsyncStorage.getItem(key);
            // Parse stored json or if none return initialValue
            const value: T = item === '' ? [] : item ? JSON.parse(item) : ""
            setStoredValue(value);
        } catch (error) {
            // If error also return initialValue
            setStoredValue(initialValue);
        }
    }

    useLayoutEffect(() => {
        getStoredItem();
    }, []);

    const setValue = async (value: any) => {
        try {
            // Allow value to be a function so we have same API as useState
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;
            // Save state
            setStoredValue(valueToStore);
            // Save to local storage
            await AsyncStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            // A more advanced implementation would handle the error case
        }
    };

    return [storedValue, setValue];
}

export default useAsyncStorage