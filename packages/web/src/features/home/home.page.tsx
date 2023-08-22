import BaseLayout from '@/components/layout/base-layout/base-layout.ui';

import BackgroundImage from '@/assets/background-home.png';
import { styled } from 'styled-components';
import { ContainedButton } from '@/components/button/button.ui';
import Spacings from '@/styles/tokens/spacing';
import Colors from '@/styles/tokens/color';
import { Text } from '@chakra-ui/react';
import t from '@/infra/i18n';

function HomePage({ ...props }) {
    return (
        <BaseLayout {...props}>
            <HeroImage />
            <ActionButtonContainer>
                <ActionButton>{t('Home.ShippingTracking')}</ActionButton>
                <ActionButton>{t('Home.FollowQuotation')}</ActionButton>
            </ActionButtonContainer>
            <CopyrightText>{t('Home.Copyright')}</CopyrightText>
        </BaseLayout>
    );
}

const CopyrightText = styled(Text)`
    align-self: center;
`;

const ActionButtonContainer = styled.div`
    display: flex;
    width: 100%;
    padding: ${Spacings.MEDIUM};
    gap: ${Spacings.EXTRA_LARGE};
    justify-content: center;
`;

const ActionButton = styled(ContainedButton)`
    && {
        height: 100px;
        width: 400px;
        background-color: ${Colors.WHITE};
        border: 1px solid ${Colors.PRIMARY};
        color: ${Colors.DARK_GREY};
    }
`;

const HeroImage = styled.img.attrs({
    src: BackgroundImage,
})`
    min-height: 60%;
`;

export default HomePage;
