import { useEffect, useState } from 'react';

const useWebsocket = (url: string) => {
    const [websocket, setWebsocket] = useState<WebSocket | null>(null);

    useEffect(() => {
        const ws = new WebSocket(url);
        setWebsocket(ws);
        return () => {
            ws.close();
        };
    }, [url]);

    return websocket;
};

export default useWebsocket;
