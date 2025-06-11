import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import cartReducer from './features/cart/cartSlice';
import authApi from './features/auth/authApi';
import authReducer from './features/auth/authSlice';
import productsApi from './features/products/productsApi';
import reviewApi from './features/reviews/reviewsApi';
import statsApi from './features/stats/statsApi';
import orderApi from './features/orders/orderApi';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], 
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [authApi.reducerPath]: authApi.reducer,
    auth: persistedAuthReducer, 
    [productsApi.reducerPath] : productsApi.reducer,
    [reviewApi.reducerPath] : reviewApi.reducer,
    [statsApi.reducerPath] : statsApi.reducer,
    [orderApi.reducerPath] : orderApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }).concat(authApi.middleware, productsApi.middleware, reviewApi.middleware, statsApi.middleware, orderApi.middleware),
});

export const persistor = persistStore(store);
