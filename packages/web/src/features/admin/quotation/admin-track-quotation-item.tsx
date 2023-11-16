import { ContainedButton } from '@/components/button/button.ui';
import { HContainer } from '@/components/container/container.ui';
import Divider from '@/components/divider';
import QuotationItem from '@/components/quotation/quotation-item.ui';
import Colors from '@/styles/tokens/color';
import Spacings from '@/styles/tokens/spacing';
import normalizeAddressLabel from '@/utils/normalize-address-label';
import TQuotationModel from '@shared/models/Quotation.model';
import AdminCreateOffer from '../offer/admin-offer-create';
import AdminCancelOffer from '../offer/admin-offer-cancel';
import { useState } from 'react';
import { OFFER_STATUS } from '@shared/constants/offer-status.const';

function AdminTrackQuotationItem({
    fetchQuotations,
    data,
    ...props
}: {
    fetchQuotations(): void;
    data: TQuotationModel;
}) {
    const [isCreateOfferModalOpen, setIsCreateOfferModalOpen] = useState(false);
    const [isCancelOfferModalOpen, setIsCancelOfferModalOpen] = useState(false);

    function onCloseCancelOfferHandler() {
        fetchQuotations();
        setIsCancelOfferModalOpen(false);
    }
    function onCloseCreateOfferHandler() {
        fetchQuotations();
        setIsCreateOfferModalOpen(false);
    }

    const isCancelOfferVisible = data?.offers?.some((offer) => offer.status == OFFER_STATUS.APPROVED);

    return (
        <>
            <AdminCancelOffer isOpen={isCancelOfferModalOpen} onClose={onCloseCancelOfferHandler} data={data} />

            <AdminCreateOffer isOpen={isCreateOfferModalOpen} onClose={onCloseCreateOfferHandler} data={data} />

            <QuotationItem.Container {...props}>
                <QuotationItem.InfoTitle>#{data.id}</QuotationItem.InfoTitle>

                <Divider borderColor={Colors.PRIMARY} />

                <QuotationItem.InfoLabel label="Horário" value={data.createdAt} />
                <QuotationItem.InfoLabel label="CPF" value={data.cpf} />
                <QuotationItem.InfoLabel label="Email" value={data.email} />
                <QuotationItem.InfoLabel label="Tipo de remessa" value={data?.itemRemittances?.[0].objectType} />
                <QuotationItem.InfoLabel label="Peso" value={data?.itemRemittances?.[0].weight} />

                <QuotationItem.InfoLabel label="Endereço de origem" value={normalizeAddressLabel(data.originAddress)} />

                <QuotationItem.InfoLabel
                    label="Endereço de destino"
                    value={normalizeAddressLabel(data.destinationAddress)}
                />

                <Divider borderColor={Colors.PRIMARY} />

                <HContainer gap={Spacings.MEDIUM} style={{ justifyContent: 'flex-end' }}>
                    {isCancelOfferVisible && (
                        <ContainedButton onClick={() => setIsCancelOfferModalOpen(true)}>Cancelar</ContainedButton>
                    )}

                    {!isCancelOfferVisible && (
                        <ContainedButton onClick={() => setIsCreateOfferModalOpen(true)}>Criar oferta</ContainedButton>
                    )}
                </HContainer>
            </QuotationItem.Container>
        </>
    );
}

export default AdminTrackQuotationItem;
