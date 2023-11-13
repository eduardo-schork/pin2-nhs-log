import { createBrowserRouter } from 'react-router-dom';
import HomePage from '@/features/home/home.page';
import LoginPage from '@/features/admin/auth/login/login.page';
import RegisterPage from '@/features/admin/auth/register/register.page';

import TrackQuotationPage from '@/features/quotation/track/track-quotation.page';
import QuotationPage from '@/features/quotation/quotation.page';
import AdminDashboardPage from '@/features/admin/dashboard/admin-dashboard.page';
import AdminQuotationPage from '@/features/admin/quotation/admin-quotation.page';
import ScheduleCollectionPage from '@/features/quotation/schedule-collection/schedule-collection.page';
import CreateFleet from '@/features/admin/fleets/fleet/create-fleet.page';
import CreateVehicleModal from '@/features/admin/fleets/fleet-vehicle/modal-create-fleet-vehicle.page';
import DeliveryProcessPage from '@/features/delivery-process/delivery-process.page';
import AdminManageDeliveryProcessPage from '@/features/admin/delivery-process/admin-manage-delivery-process.page';

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
        path: '/quotation/track/:id',
        element: <TrackQuotationPage />,
    },
    {
        path: '/quotation/schedule-collection',
        element: <ScheduleCollectionPage />,
    },
    {
        path: '/delivery-process',
        element: <DeliveryProcessPage />,
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
        element: <AdminQuotationPage />,
    },
    {
        path: '/admin/fleet-vehicle',
        element: <CreateVehicleModal />,
    },
    {
        path: '/admin/delivery-process',
        element: <AdminManageDeliveryProcessPage />,
    },
    {
        path: '/admin/fleet',
        element: <CreateFleet />,
    },
];

const AppRouter = createBrowserRouter([...BASE_ROUTES, ...ADMIN_ROUTES]);

export default AppRouter;
