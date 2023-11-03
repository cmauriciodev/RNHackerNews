import { useEffect, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';

export const useConnection = () => {
    const [isConnected, setIsConnected] = useState(true);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected || false);
        });

        NetInfo.fetch().then(state => {
            setIsConnected(state.isConnected || false);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return {
        isConnected,
    };
};
