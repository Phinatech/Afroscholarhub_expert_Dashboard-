import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { element } from './routes/Router'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import IsLoading from './pages/isLoading/IsLoading'
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { persistor, store } from './global/redux/Store'
import { PersistGate } from 'redux-persist/integration/react'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <App /> */}
    
    <QueryClientProvider client={queryClient}>
    <Suspense fallback={<IsLoading />}>
        <Provider store={store}>
          <PersistGate loading={<IsLoading />} persistor={persistor}>
            <RouterProvider router={element} />
              <ToastContainer />
          </PersistGate>
        </Provider>
    </Suspense>
    </QueryClientProvider>
  </StrictMode>,
)
