import { createBrowserRouter } from 'react-router-dom';
import HomePage from '@/features/home/home.page';
import LoginPage from '@/features/auth/login/login.page';

import AdminQuoationPage from '@/features/admin/quotation/admin-quotation.page';
import AdminDashboardPage from '@/features/admin/dashboard/admin-dashboard.page';
import AdminFleetVehiclePage from '@/features/admin/fleet/admin-fleet-vehicle.page';
import QuotationPage from '@/features/quotation/quotation.page';
import TrackQuotationPage from '@/features/quotation/track/track-quotation.page';

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
        path: '/quotation',
        element: <QuotationPage />,
    },
    {
        path: '/quotation/track',
        element: <TrackQuotationPage />,
    },
    {
        path: '/admin',
        element: <AdminDashboardPage />,
    },
    {
        path: '/admin/quotation',
        element: <AdminQuoationPage />,
    },
    {
        path: '/admin/fleet-vehicle',
        element: <AdminFleetVehiclePage />,
    },
]);

export default AppRouter;
