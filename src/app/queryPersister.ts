import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister'
import localforage from 'localforage'

export const queryPersister = createAsyncStoragePersister({
    storage: {
        getItem: async (key) => localforage.getItem(key),
        setItem: async (key, value) => localforage.setItem(key, value),
        removeItem: async (key) => localforage.removeItem(key),
    },
});
