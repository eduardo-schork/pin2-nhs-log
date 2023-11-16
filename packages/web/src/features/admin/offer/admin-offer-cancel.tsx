import { Select } from '@chakra-ui/react'; // Importe o componente Select do Chakra UI
import { ContainedButton } from '@/components/button/button.ui';
import { HContainer } from '@/components/container/container.ui';
import Spacings from '@/styles/tokens/spacing';
import { toast } from 'react-toastify';
import { useState } from 'react';
import Modal from '@/components/custom.modal';
import { OFFER_STATUS } from '@shared/constants/offer-status.const';
import TOfferModel from '@shared/models/Offer.model';

function AdminCancelOfer({
    isOpen,
    onClose,
    data,
    ...props
}: {
    isOpen: boolean;
    onClose(): void;
    data: { offers: TOfferModel[]; id: number };
}) {
    const [isSuccess, setIsSuccess] = useState(false);

    async function handleSubmit() {
        try {
            const requestData = {
                id: data.offers?.find((offer) => offer.status == OFFER_STATUS.APPROVED)?.id,
                quotationId: data.id,
                status: 'Cancelado',
            };
            const requestDataString = JSON.stringify(requestData);

            const res = await fetch(`http://localhost:8000/api/offer`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: requestDataString,
            });

            if (res.status != 200) {
                toast.error('Ocorreu um erro ao cancelar a oferta, tente novamente', { position: 'bottom-right' });
                onClose();
            } else {
                setIsSuccess(true);
                toast.success('Oferta cancelada com sucesso', { position: 'bottom-right' });
                onClose();
            }
        } catch (error) {
            toast.error('Ocorreu um erro ao criar a oferta, tente novamente', { position: 'bottom-right' });
        }
    }

    return (
        <Modal {...props} title={`Deseja cancelar a oferta da cotação #${data.id}?`} isOpen={isOpen} onClose={onClose}>
            <HContainer gap={Spacings.LARGE} style={{ justifyContent: 'center' }}>
                <ContainedButton onClick={handleSubmit}>Cancelar</ContainedButton>
            </HContainer>
        </Modal>
    );
}

export default AdminCancelOfer;
