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
import { useEffect, useState } from 'react';
import EditModal from '@/features/admin/auth/edit/edit.modal';
import getAdminId from '@/utils/get-admin-id';

function AppBar({ userId, ...props }: { userId?: number }) {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [currentAdminId, setCurrentAdminId] = useState<number | string | null>(userId);

    useEffect(() => {
        setCurrentAdminId(getAdminId());
    }, [isModalOpen]);

    function handleOnClickLogo() {
        const adminId = getAdminId();

        if (adminId) {
            navigate('/admin');
        } else {
            navigate(`/`);
        }
    }

    function handleOnClickAdmin() {
        const adminId = getAdminId();

        if (adminId) {
            setIsModalOpen(true);
        } else {
            navigate('/admin/login');
        }
    }

    return (
        <Container {...props}>
            <LogoContainer>
                <LogoImage src={ImagePng} onClick={handleOnClickLogo} alt={'logo'} />
                <CompanyNameText fontSize={'2xl'}>{t('common.CompanyName')}</CompanyNameText>
            </LogoContainer>

            <UserIcon className="user-actions-button" onClick={handleOnClickAdmin} />
            {isModalOpen && (
                <EditModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} user={currentAdminId} />
            )}
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
