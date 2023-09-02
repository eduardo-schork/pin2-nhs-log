import BaseLayout from '@/components/layout/base-layout/base-layout.ui';

import t from '@/infra/i18n';
import HeroImage from '@/components/hero-image.ui';
import ActionButton from '@/components/action-button.ui';
import CopyrightText from '@/components/copyright-text.ui';
import Containers from '@/components/containers.ui';

function HomePage({ ...props }) {
    return (
        <BaseLayout {...props}>
            <HeroImage />
            <Containers.PageActions>
                <ActionButton>{t('Home.ShippingTracking')}</ActionButton>
                <ActionButton>{t('Home.FollowQuotation')}</ActionButton>
            </Containers.PageActions>
            <CopyrightText />
        </BaseLayout>
    );
}

export default HomePage;
