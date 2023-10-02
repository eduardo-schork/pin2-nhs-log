import ActionButton from '@/components/action-button.ui';
import Containers from '@/components/containers.ui';
import CopyrightText from '@/components/copyright-text.ui';
import HeroImage from '@/components/hero-image.ui';
import BaseLayout from '@/components/layout/base-layout/base-layout.ui';
import t from '@/infra/i18n';

function AdminDashboardPage({ ...props }) {
    return (
        <BaseLayout {...props}>
            <HeroImage />
            <Containers.PageActions>
                <ActionButton>{t('Dashboard.ManageFleets')}</ActionButton>
                <ActionButton>{t('Dashboard.FollowQuotation')}</ActionButton>
                <ActionButton>{t('Dashboard.ManageProcess')}</ActionButton>
            </Containers.PageActions>
            <CopyrightText />
        </BaseLayout>
    );
}

export default AdminDashboardPage;
