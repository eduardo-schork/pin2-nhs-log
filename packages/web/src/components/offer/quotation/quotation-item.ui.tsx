import Spacings from '@/styles/tokens/spacing';
import { styled } from 'styled-components';
import Container, { VContainer } from '../../container/container.ui';
import { Text } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';

const QuotationItemContainer = styled(VContainer)`
    padding: ${Spacings.LARGE};
    gap: ${Spacings.MEDIUM};
    border-radius: ${Spacings.SMALL};
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;

const QuotationsListContainer = styled(Container).attrs({
    grid: true,
    gap: Spacings.MEDIUM,
})`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: ${Spacings.MEDIUM};

    padding: ${Spacings.MEDIUM};

    @media (max-width: 900px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 600px) {
        grid-template-columns: 1fr; /* Reduz para 1 coluna */
    }
`;

function QuotationInfoLabel({ label, value, ...props }: { label: string; value: any }) {
    return (
        <Text {...props}>
            <b>{label}</b>: {value}
        </Text>
    );
}

function QuotationInfoTitle({ children, ...props }: PropsWithChildren) {
    return (
        <Text size={'xl'} fontWeight={'bold'} {...props}>
            {children}
        </Text>
    );
}

const QuotationItem = {
    Container: QuotationItemContainer,
    ListContainer: QuotationsListContainer,
    InfoLabel: QuotationInfoLabel,
    InfoTitle: QuotationInfoTitle,
};

export default QuotationItem;
