import BaseLayout from '@/components/layout/base-layout/base-layout.ui';
import { Text } from '@chakra-ui/react';

import QuotationItemMock from '@/fixtures/quotation-item.mock.json';
import TQuotationModel from '@/models/Quotation.model';

import styled from 'styled-components';
import { HContainer } from '@/components/container/container.ui';

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
                #{item.id} - {item?.remittanceType?.objectType}
            </Text>
        </QuotationItemContainer>
    );
}

const QuotationItemContainer = styled(HContainer)``;

export default TrackQuotationPage;
