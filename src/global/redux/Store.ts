import { configureStore } from '@reduxjs/toolkit';
import userReducer from './UserSlice';
import profileReducer from "./ProfileSlice";
import storage from 'redux-persist/lib/storage'; // defaults to localStorage
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage,
  // blacklist: ["expertId", "profile"]
};



const persistedUserReducer = persistReducer(persistConfig, userReducer);
const persistedProfileReducer = persistReducer(persistConfig, profileReducer);


const store = configureStore({
  reducer: {
    user: persistedUserReducer, // Use 'user' as the key
    profile: persistedProfileReducer,
  },
});

const persistor = persistStore(store);

export { store, persistor };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;



// const userPersistConfig = {
//   key: 'root',
//   storage,
//   // whitelist: ['accessToken', 'refreshToken'], // Only persist tokens
// };

// // Conditional persist for profile (expertId depends on token)
// const profilePersistConfig = {
//   key: 'root',
//   storage,
//   // blacklist: ['expertId'], // Prevent expertId from persisting by default
// };