import { createBrowserRouter } from 'react-router-dom';
import HomePage from '@/features/home/home.page';
import LoginPage from '@/features/auth/login/login.page';
import DashboardPage from '@/features/admin/dashboard/dashboard.page';
import QuoationPage from '@/features/admin/quotation/quotation.page';
import FleetVehiclePage from '@/features/admin/fleet/fleet-vehicle.page';
import RegisterPage from '@/features/auth/register/register.page';

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
        path: '/admin/register',
        element: <RegisterPage/>,
    },
    {
        path: '/admin',
        element: <DashboardPage />,
    },
    {
        path: '/admin/quotation',
        element: <QuoationPage />,
    },
    {
        path: '/admin/fleet/vehicle',
        element: <FleetVehiclePage />,
    },
]);

export default AppRouter;
