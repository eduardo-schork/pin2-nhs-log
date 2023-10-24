import { ContainedButton } from '@/components/button/button.ui';
import { HContainer, VContainer } from '@/components/container/container.ui';
import Spacings from '@/styles/tokens/spacing';
import { Text } from '@chakra-ui/react';

import TQuotationModel from '@shared/models/Quotation.model';
import { DateTime } from 'luxon';

import styled from 'styled-components';

function QuotationItem({
    item,
    onItemSeeOffersPress,
    ...props
}: {
    item: TQuotationModel;
    onItemSeeOffersPress: (quotationId: number) => void;
}) {
    // const formattedDate = DateTime.fromSQL(item.createdAt).toFormat('fff');

    // console.log({ formattedDate });

    console.log({ item });

    return (
        <QuotationItemContainer {...props}>
            <Text>
                #{item.id} - {item?.itemRemittance?.objectType}
            </Text>

            <HContainer gap={Spacings.MEDIUM}>
                <ContainedButton>Agendar coleta</ContainedButton>
                <ContainedButton onClick={() => onItemSeeOffersPress(item.id)}>Ver ofertas</ContainedButton>
            </HContainer>
        </QuotationItemContainer>
    );
}

const QuotationItemContainer = styled(VContainer)`
    padding: ${Spacings.LARGE};
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
`;
export default QuotationItem;
