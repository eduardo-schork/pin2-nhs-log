import { createBrowserRouter } from 'react-router-dom';
import HomePage from '@/features/home/home.page';
import LoginPage from '@/features/admin/auth/login/login.page';
import RegisterPage from '@/features/admin/auth/register/register.page';

import TrackQuotationPage from '@/features/quotation/track/track-quotation.page';
import QuotationPage from '@/features/quotation/quotation.page';
import AdminDashboardPage from '@/features/admin/dashboard/admin-dashboard.page';
import AdminQuoationPage from '@/features/admin/quotation/admin-quotation.page';
import AdminFleetVehiclePage from '@/features/admin/fleet/admin-fleet-vehicle.page';
import ScheduleCollectionPage from '@/features/quotation/schedule-collection/schedule-collection.page';

const BASE_ROUTES = [
    {
        path: '/',
        element: <HomePage />,
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
        path: '/quotation/schedule-collection',
        element: <ScheduleCollectionPage />,
    },
];

const ADMIN_ROUTES = [
    {
        path: '/admin/login',
        element: <LoginPage />,
    },
    {
        path: '/admin/register',
        element: <RegisterPage />,
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
];

const AppRouter = createBrowserRouter([...BASE_ROUTES, ...ADMIN_ROUTES]);

export default AppRouter;
