import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom'; 
import { Provider } from 'react-redux'; 
import router from './routers/router';
import 'remixicon/fonts/remixicon.css';
import { store, persistor } from './redux/store';  // Import persistor
import { PersistGate } from 'redux-persist/integration/react';  // Import PersistGate

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>  {/* Wrap RouterProvider inside PersistGate */}
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </StrictMode>
);
