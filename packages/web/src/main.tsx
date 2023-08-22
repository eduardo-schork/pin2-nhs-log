import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from './router/app.router.tsx';
import { RouterProvider } from 'react-router-dom';

import './index.css';
import { ChakraProvider } from '@chakra-ui/react';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ChakraProvider>
            <RouterProvider router={AppRouter} />
        </ChakraProvider>
    </React.StrictMode>,
);
