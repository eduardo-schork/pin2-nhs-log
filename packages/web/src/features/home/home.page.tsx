import BaseLayout from '@/components/layout/base-layout/base-layout.ui';

import t from '@/infra/i18n';
import HeroImage from '@/components/hero-image.ui';
import ActionButton from '@/components/action-button.ui';
import Containers from '@/components/containers.ui';
import { useNavigate } from 'react-router-dom';

function HomePage({ ...props }) {
    const navigate = useNavigate();
    return (
        <BaseLayout {...props}>
            <HeroImage />
            <Containers.PageActions>
                <ActionButton onClick={() => navigate('/delivery-process')}>{t('Home.ShippingTracking')}</ActionButton>
                <ActionButton onClick={() => navigate('/quotation')}>{t('Home.FollowQuotation')}</ActionButton>
            </Containers.PageActions>
        </BaseLayout>
    );
}

export default HomePage;
