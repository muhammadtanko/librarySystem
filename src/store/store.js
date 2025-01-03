import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Use localStorage as the storage engine
import userReducer from './authSlice';

// Persist configuration
const persistConfig = {
    key: 'root', // Key to identify the persisted state
    storage, // Storage engine
    whitelist: ['user'], // Only persist the 'auth' slice
};

// Wrap the authReducer with persistReducer
const persistedUserReducer = persistReducer(persistConfig, userReducer);

// Configure store
const store = configureStore({
    reducer: {
        user: persistedUserReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        }),
});

const persistor = persistStore(store);
export { store, persistor };
