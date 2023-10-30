import { useEffect, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';

export const useConnection = () => {
    const [isConnected, setIsConnected] = useState(true);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            console.log(state.isConnected);

            if (state.isConnected === true) {
                setIsConnected(true);
            } else {
                setIsConnected(false);
            }
        });
        return () => {
            unsubscribe();
        };
    }, []);

    return {
        isConnected,
    };
};
