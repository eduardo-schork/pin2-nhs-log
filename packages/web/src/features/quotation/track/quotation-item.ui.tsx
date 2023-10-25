import { ContainedButton } from '@/components/button/button.ui';
import { HContainer, VContainer } from '@/components/container/container.ui';
import Spacings from '@/styles/tokens/spacing';
import { Divider, Text } from '@chakra-ui/react';
import TAddressModel from '@shared/models/Address.model';
import TQuotationModel from '@shared/models/Quotation.model';

import styled from 'styled-components';

// TODO i18n
function QuotationItem({
    item,
    onItemSeeOffersPress,
    ...props
}: {
    item: TQuotationModel;
    onItemSeeOffersPress: (quotationId: number) => void;
}) {
    function normalizeAddressLabel(address?: TAddressModel) {
        if (!address) return;

        const { city, state, number, country } = address;
        if (city && state && number) return `${city}, ${state}, ${country}, Nº ${number}`;

        return '';
    }

    if (!item.id) return <></>;

    return (
        <QuotationItemContainer {...props}>
            <Text fontWeight={'bold'} fontSize="xl">
                #{item.id} - {item?.itemRemittances?.[0]?.objectType}
            </Text>

            <Divider />

            <VContainer gap={Spacings.SMALL}>
                <QuotationInfoLabel label="Data de criação" value={item.createdAt} />
                <QuotationInfoLabel label="Peso" value={item?.itemRemittances?.[0]?.weight} />

                <QuotationInfoLabel label="Endereço de origem" value={normalizeAddressLabel(item.originAddress)} />
                <QuotationInfoLabel
                    label="Endereço de destino"
                    value={normalizeAddressLabel(item.destinationAddress)}
                />
            </VContainer>

            <Divider />

            <ActionButtonContainer>
                {/* <ContainedButton style={{ width: 'fit-content' }}>Agendar coleta</ContainedButton> */}
                <ContainedButton style={{ width: 'fit-content' }} onClick={() => onItemSeeOffersPress(item.id)}>
                    Ver ofertas
                </ContainedButton>
            </ActionButtonContainer>
        </QuotationItemContainer>
    );
}

function QuotationInfoLabel({ label, value, ...props }: { label: string; value: any }) {
    return (
        <Text {...props}>
            <b>{label}</b>: {value}
        </Text>
    );
}

const ActionButtonContainer = styled(HContainer)`
    gap: ${Spacings.MEDIUM};
    justify-content: flex-end;
`;

const QuotationItemContainer = styled(VContainer)`
    padding: ${Spacings.LARGE};
    gap: ${Spacings.MEDIUM};
    border-radius: ${Spacings.SMALL};
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;
export default QuotationItem;
