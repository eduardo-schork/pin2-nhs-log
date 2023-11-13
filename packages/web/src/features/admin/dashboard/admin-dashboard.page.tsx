import ActionButton from '@/components/action-button.ui';
import Containers from '@/components/containers.ui';
import CopyrightText from '@/components/copyright-text.ui';
import HeroImage from '@/components/hero-image.ui';
import BaseLayout from '@/components/layout/base-layout/base-layout.ui';
import t from '@/infra/i18n';
import { Link, useLocation } from 'react-router-dom';

function AdminDashboardPage({ ...props }) {
    const location = useLocation();
    const userId = location.state?.userId.userId;

    return (
        <BaseLayout {...props} userId={userId}>
            <HeroImage />
            <Containers.PageActions>
                <Link to="/admin/fleet">
                    <ActionButton>{t('Dashboard.ManageFleets')}</ActionButton>
                </Link>
                <Link to="/admin/quotation">
                    <ActionButton>{t('Dashboard.FollowQuotation')}</ActionButton>
                </Link>
                <Link to="/admin/delivery-process">
                    <ActionButton>{t('Dashboard.ManageProcess')}</ActionButton>
                </Link>
            </Containers.PageActions>
            <CopyrightText />
        </BaseLayout>
    );
}

export default AdminDashboardPage;
