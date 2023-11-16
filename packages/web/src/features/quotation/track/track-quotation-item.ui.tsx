import { ContainedButton } from '@/components/button/button.ui';
import { HContainer, VContainer } from '@/components/container/container.ui';
import Divider from '@/components/divider';
import QuotationItem from '@/components/quotation/quotation-item.ui';
import Spacings from '@/styles/tokens/spacing';
import normalizeAddressLabel from '@/utils/normalize-address-label';
import { Text } from '@chakra-ui/react';
import TQuotationModel from '@shared/models/Quotation.model';

import styled from 'styled-components';

// TODO i18n
function TrackQuotationItem({
    item,
    onItemSeeOffersPress,
    ...props
}: {
    item: TQuotationModel;
    onItemSeeOffersPress: (quotationId?: number) => void;
}) {
    console.log({ item });
    if (!item?.id) return <></>;

    return (
        <QuotationItem.Container {...props}>
            <Text fontWeight={'bold'} fontSize="xl">
                #{item.id} - {item?.itemRemittances?.[0]?.objectType}
            </Text>

            <Divider />

            <VContainer gap={Spacings.SMALL}>
                <QuotationItem.InfoLabel label="Data de criação" value={item.createdAt} />
                <QuotationItem.InfoLabel label="Peso" value={item?.itemRemittances?.[0]?.weight} />

                <QuotationItem.InfoLabel label="Endereço de origem" value={normalizeAddressLabel(item.originAddress)} />
                <QuotationItem.InfoLabel
                    label="Endereço de destino"
                    value={normalizeAddressLabel(item.destinationAddress)}
                />
            </VContainer>

            <Divider />

            <ActionButtonContainer>
                <ContainedButton style={{ width: 'fit-content' }} onClick={() => onItemSeeOffersPress(item.id)}>
                    Ver ofertas
                </ContainedButton>
            </ActionButtonContainer>
        </QuotationItem.Container>
    );
}

const ActionButtonContainer = styled(HContainer)`
    gap: ${Spacings.MEDIUM};
    justify-content: flex-end;
`;

export default TrackQuotationItem;
