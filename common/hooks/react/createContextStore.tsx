import React, { useRef, createContext, useContext, useCallback, useSyncExternalStore } from "react";

export default function createContextStore<Store> (initialState: Store): any {
    type IUseStoreData = {
        get: () => Store;
        set: (value: Partial<Store>) => void;
        subscribe: (callback: () => void) => () => void;
    };

    function useStoreData (): IUseStoreData {
        const store = useRef(initialState);

        const get = useCallback(() => store.current, []);

        const subscribers = useRef(new Set<() => void>());

        const set = useCallback((value: Partial<Store>) => {
            store.current = { ...store.current, ...value };
            subscribers.current.forEach((callback) => { callback(); });
        }, []);

        const subscribe = useCallback((callback: () => void) => {
            subscribers.current.add(callback);
            return () => subscribers.current.delete(callback);
        }, []);

        return {
            get,
            set,
            subscribe
        };
    }

    type UseStoreDataReturnType = ReturnType<typeof useStoreData>;

    const StoreContext = createContext<UseStoreDataReturnType | null>(null);

    function Provider ({ children }: { children: React.ReactNode }): any {
        return <StoreContext.Provider value={useStoreData()}>{children}</StoreContext.Provider>;
    }

    function useStore<SelectorOutput> (selector: (store: Store) => SelectorOutput): [SelectorOutput, (value: Partial<Store>) => void] {
        const store = useContext(StoreContext);
        if (store == null) {
            throw new Error("Store not found");
        }

        const state = useSyncExternalStore(
            store.subscribe,
            () => selector(store.get()),
            () => selector(initialState)
        );

        return [state, store.set];
    }

    return {
        Provider,
        useStore
    };
}
