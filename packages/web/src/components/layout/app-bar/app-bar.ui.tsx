import { useNavigate } from 'react-router-dom';
import { Container, LogoImage } from './app-bar.styles';
import ImagePng from '@/assets/logo.png';
import { IconButton, Text } from '@chakra-ui/react';

import { MdPerson } from 'react-icons/md';
import { styled } from 'styled-components';
import Spacings from '@/styles/tokens/spacing';
import FontSizes from '@/styles/tokens/font-size';
import t from '@/infra/i18n';

function AppBar({ ...props }): JSX.Element {
    const navigate = useNavigate();

    function handleOnClickLogo() {
        navigate(`/`);
    }

    return (
        <Container {...props}>
            <LogoContainer>
                <LogoImage src={ImagePng} onClick={handleOnClickLogo} alt={'logo'} />
                <CompanyNameText fontSize={'2xl'}>{t('common.CompanyName')}</CompanyNameText>
            </LogoContainer>

            <UserIcon onClick={() => alert('oie')} />
        </Container>
    );
}

const CompanyNameText = styled(Text).attrs({})`
    font-size: ${FontSizes.LARGE};
    align-self: center;
`;

const LogoContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    gap: ${Spacings.MEDIUM};
`;

const UserIcon = styled(IconButton).attrs({
    as: MdPerson,
})`
    cursor: pointer;
    width: ${Spacings.EXTRA_LARGE};
    height: ${Spacings.EXTRA_LARGE};
    align-self: center;
`;

export default AppBar;