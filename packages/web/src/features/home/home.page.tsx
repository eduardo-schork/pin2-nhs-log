import BaseLayout from '@/components/layout/base-layout/base-layout.ui';

import t from '@/infra/i18n';
import HeroImage from '@/components/hero-image.ui';
import ActionButton from '@/components/action-button.ui';
import Containers from '@/components/containers.ui';
import { useNavigate } from 'react-router-dom';
import { Icon, Text } from '@chakra-ui/react';

import { FaShippingFast } from 'react-icons/fa';
import Spacings from '@/styles/tokens/spacing';
import { BsFillBoxSeamFill } from 'react-icons/bs';

function HomePage({ ...props }) {
    const navigate = useNavigate();
    return (
        <BaseLayout {...props}>
            <HeroImage>
                <AboutSectionContent />
            </HeroImage>

            <Containers.PageActions>
                <ActionButton style={{ gap: Spacings.SMALL }} onClick={() => navigate('/delivery-process')}>
                    <Text>{t('Home.ShippingTracking')}</Text>
                    <Icon boxSize={6} as={BsFillBoxSeamFill} />
                </ActionButton>
                <ActionButton style={{ gap: Spacings.SMALL }} onClick={() => navigate('/quotation')}>
                    <Text>{t('Home.FollowQuotation')}</Text>
                    <Icon boxSize={6} as={FaShippingFast} />
                </ActionButton>
            </Containers.PageActions>
        </BaseLayout>
    );
}

function AboutSectionContent({ ...props }) {
    return (
        <>
            <Text {...props} alignSelf={'center'} fontWeight={'bold'} fontSize={'2xl'}>
                SOBRE
            </Text>
            <Text textAlign={'center'}>Bem-vindo ao NHS Log: Transformando a Logística de Transporte</Text>
            <Text textAlign={'center'}>
                Na era da alta demanda por serviços de transporte, surgiu o NHS Log. Nossa plataforma inovadora
                centraliza o rastreamento de pacotes, permitindo que os usuários acompanhem em tempo real a localização
                e o histórico de seus envios. Simplificamos a experiência logística, facilitando a criação de
                solicitações de transporte personalizadas para remessas. Junte-se a nós e descubra uma nova era na
                logística de transporte com o NHS Log.
            </Text>
        </>
    );
}

export default HomePage;
