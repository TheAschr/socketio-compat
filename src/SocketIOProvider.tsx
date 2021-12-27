import React, { createContext, useEffect, useRef } from 'react';
import io, { ManagerOptions, SocketOptions } from 'socket.io-client';

type SocketIOContextValue = ReturnType<typeof io>;

const SocketIOContext = createContext<SocketIOContextValue | null>(null);

export const SocketIOProvider: React.FC<{
    uri: string;
    opts?: Partial<ManagerOptions & SocketOptions> ;
}> = React.memo(({ uri, opts, children }) => {
    const socket = useRef(io(uri, opts));

    useEffect(() => {
        const currentSocket = socket.current;
        return () => {
            currentSocket.disconnect();
        }
    }, [])

    return <SocketIOContext.Provider value={socket.current}>{children}</SocketIOContext.Provider>
})