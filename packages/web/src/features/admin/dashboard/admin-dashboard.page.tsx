import ActionButton from '@/components/action-button.ui';
import Containers from '@/components/containers.ui';
import CopyrightText from '@/components/copyright-text.ui';
import HeroImage from '@/components/hero-image.ui';
import BaseLayout from '@/components/layout/base-layout/base-layout.ui';
import t from '@/infra/i18n';
import { Icon } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';

import { FaGear } from 'react-icons/fa6';
import { FaTruck } from 'react-icons/fa';
import { FaBoxes } from 'react-icons/fa';

function AdminDashboardPage({ ...props }) {
    const location = useLocation();
    const userId = location.state?.userId;

    return (
        <BaseLayout {...props} userId={userId}>
            <HeroImage />

            <Containers.PageActions>
                <Link to="/admin/fleet">
                    <ActionButton>
                        <Icon boxSize={6} as={FaTruck} />
                        {t('Dashboard.ManageFleets')}
                    </ActionButton>
                </Link>

                <Link to="/admin/quotation">
                    <ActionButton>
                        <Icon boxSize={6} as={FaBoxes} />
                        {t('Dashboard.FollowQuotation')}
                    </ActionButton>
                </Link>

                <Link to="/admin/delivery-process">
                    <ActionButton>
                        <Icon boxSize={6} as={FaGear} />
                        {t('Dashboard.ManageProcess')}
                    </ActionButton>
                </Link>
            </Containers.PageActions>
            <CopyrightText />
        </BaseLayout>
    );
}

export default AdminDashboardPage;
