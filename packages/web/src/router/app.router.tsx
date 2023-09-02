import { createBrowserRouter } from 'react-router-dom';
import HomePage from '@/features/home/home.page';
import LoginPage from '@/features/auth/login/login.page';
import DashboardPage from '@/features/admin/dashboard/dashboard.page';
import QuoationPage from '@/features/admin/quotation/quotation.page';

const AppRouter = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
    },
    {
        path: '/login',
        element: <LoginPage />,
    },
    {
        path: '/admin',
        element: <DashboardPage />,
    },
    {
        path: '/admin/quotation',
        element: <QuoationPage />,
    },
]);

export default AppRouter;
