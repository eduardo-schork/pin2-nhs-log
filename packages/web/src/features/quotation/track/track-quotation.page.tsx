import BaseLayout from '@/components/layout/base-layout/base-layout.ui';
import { Text } from '@chakra-ui/react';

import QuotationItemMock from '@shared/fixtures/quotation-item.mock.json';
import TQuotationModel from '@shared/models/Quotation.model';

import styled from 'styled-components';
import { HContainer, VContainer } from '@/components/container/container.ui';
import Spacings from '@/styles/tokens/spacing';
import ActionButton from '@/components/action-button.ui';
import { ContainedButton } from '@/components/button/button.ui';

const QUOTATION_LIST = [
    QuotationItemMock,
    QuotationItemMock,
    QuotationItemMock,
    QuotationItemMock,
    QuotationItemMock,
    QuotationItemMock,
];

function TrackQuotationPage({ ...props }) {
    const data = QUOTATION_LIST;

    return (
        <BaseLayout {...props}>
            <Text>Acompanhar cotações</Text>
            {data?.map((quotationItem) => (
                <QuotationItem item={quotationItem} />
            ))}
        </BaseLayout>
    );
}

function QuotationItem({ item, ...props }: { item: TQuotationModel }) {
    return (
        <QuotationItemContainer {...props}>
            <Text>
                #{item.id} - {item?.itemRemittance?.objectType}
            </Text>
            <HContainer>
                <ContainedButton>Agendar coleta</ContainedButton>
                <ContainedButton>Ver ofertas</ContainedButton>
            </HContainer>
        </QuotationItemContainer>
    );
}

const QuotationItemContainer = styled(VContainer)`
    width: fit-content;
    padding: ${Spacings.LARGE};
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
`;

export default TrackQuotationPage;
