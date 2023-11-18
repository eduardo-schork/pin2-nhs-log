import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from './router/app.router.tsx';
import { RouterProvider } from 'react-router-dom';

import './index.css';
import { ChakraProvider } from '@chakra-ui/react';

import * as Yup from 'yup';
import { pt } from 'yup-locale-pt';

Yup.setLocale(pt);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ChakraProvider>
            <RouterProvider router={AppRouter} />
        </ChakraProvider>
    </React.StrictMode>,
);
