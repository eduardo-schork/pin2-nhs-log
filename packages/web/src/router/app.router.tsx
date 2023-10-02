import { createBrowserRouter } from 'react-router-dom';
import HomePage from '@/features/home/home.page';
import LoginPage from '@/features/auth/login/login.page';
<<<<<<< HEAD
import DashboardPage from '@/features/admin/dashboard/dashboard.page';
import QuoationPage from '@/features/admin/quotation/quotation.page';
import FleetVehiclePage from '@/features/admin/fleet/fleet-vehicle.page';
import RegisterPage from '@/features/auth/register/register.page';
=======

import AdminQuoationPage from '@/features/admin/quotation/admin-quotation.page';
import AdminDashboardPage from '@/features/admin/dashboard/admin-dashboard.page';
import AdminFleetVehiclePage from '@/features/admin/fleet/admin-fleet-vehicle.page';
import QuotationPage from '@/features/quotation/quotation.page';
import TrackQuotationPage from '@/features/quotation/track/track-quotation.page';
>>>>>>> f897d23fb1b1295b6cabe942928d1c41d98644f2

const AppRouter = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
    },
    {
        path: '/admin/login',
        element: <LoginPage />,
    },
    {
<<<<<<< HEAD
        path: '/admin/register',
        element: <RegisterPage/>,
=======
        path: '/quotation',
        element: <QuotationPage />,
    },
    {
        path: '/quotation/track',
        element: <TrackQuotationPage />,
>>>>>>> f897d23fb1b1295b6cabe942928d1c41d98644f2
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
