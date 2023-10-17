import { useNavigate } from 'react-router-dom';
import { Container, LogoImage } from './app-bar.styles';
import ImagePng from '@/assets/nhs-logo.png';
import { IconButton, Text } from '@chakra-ui/react';

import { MdPerson } from 'react-icons/md';
import { styled } from 'styled-components';
import Spacings from '@/styles/tokens/spacing';
import FontSizes from '@/styles/tokens/font-size';
import t from '@/infra/i18n';
import Colors from '@/styles/tokens/color';
import { useState } from 'react';
import EditModal from '@/features/admin/auth/edit/edit.modal';

function AppBar({ userId, ...props }: { userId?: number }) {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    function handleOnClickLogo() {
        navigate(`/`);
    }

    function handleOnClickAdmin() {
        if (!userId) {
            navigate('/admin/login');
        } else {
            setIsModalOpen(true);
        }
    }

    return (
        <Container {...props}>
            <LogoContainer>
                <LogoImage src={ImagePng} onClick={handleOnClickLogo} alt={'logo'} />
                <CompanyNameText fontSize={'2xl'}>{t('common.CompanyName')}</CompanyNameText>
            </LogoContainer>

            <UserIcon onClick={handleOnClickAdmin} />
            {isModalOpen && <EditModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} user={userId} />}
        </Container>
    );
}

const CompanyNameText = styled(Text).attrs({})`
    font-size: ${FontSizes.LARGE};
    align-self: center;
    color: ${Colors.WHITE};
`;

const LogoContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
`;

const UserIcon = styled(IconButton).attrs({
    as: MdPerson,
})`
    color: ${Colors.WHITE};
    cursor: pointer;
    width: ${Spacings.EXTRA_LARGE};
    height: ${Spacings.EXTRA_LARGE};
    align-self: center;
`;

export default AppBar;
