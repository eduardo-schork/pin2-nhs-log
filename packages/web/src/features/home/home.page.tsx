import BaseLayout from '@/components/layout/base-layout/base-layout.ui';

import t from '@/infra/i18n';
import HeroImage from '@/components/hero-image.ui';
import ActionButton from '@/components/action-button.ui';
import CopyrightText from '@/components/copyright-text.ui';
import Containers from '@/components/containers.ui';
import { useNavigate } from 'react-router-dom';

function HomePage({ ...props }) {
    const navigate = useNavigate();
    return (
        <BaseLayout {...props}>
            <HeroImage />
            <Containers.PageActions>
                <ActionButton>{t('Home.ShippingTracking')}</ActionButton>
                <ActionButton onClick={() => navigate('/quotation')}>{t('Home.FollowQuotation')}</ActionButton>
            </Containers.PageActions>
            <CopyrightText />
        </BaseLayout>
    );
}

export default HomePage;
