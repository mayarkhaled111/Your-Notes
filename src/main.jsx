import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import App from './App.jsx'
import '@fortawesome/fontawesome-free/css/all.min.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './index.css'
import 'react-toastify/dist/ReactToastify.css';
import 'flowbite';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import AuthContextProvider from './context/AuthContext.jsx';

const queryClient = new QueryClient()
createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>

     <AuthContextProvider>
     <App></App>
     </AuthContextProvider>
    </QueryClientProvider>
  
)
