import { useEffect, useState } from 'react';
import Modal, { TModalProps } from '../custom.modal';
import FormTextInput from '@/components/form/text-input/form-text-input.ui';
import { ContainedButton } from '@/components/button/button.ui';
import { toast } from 'react-toastify';

function QuotationOffersModal({ quotationId, isOpenCreateModal, closeCreateModalHandler, ...props }: TModalProps & { quotationId?: number, isOpenCreateModal: boolean, closeCreateModalHandler: () => void }){
    const [quotationOffers, setQuotationOffers] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8000/api/offerByQuotation/${quotationId}`)
            .then((response) => response.json())
            .then((data) => {
                console.log('quotationOffers:', data);

                const filteredOffers = data.filter((offer) => {
                    return offer.status === 'Em aberto' || offer.status === 'Em negociação';
                });
                setQuotationOffers(filteredOffers);

                if (filteredOffers.length === 0) {
                    toast.error('Ainda não há nenhuma oferta disponível', { position: 'bottom-right' });
                }
            })
            .catch((error) => {
                console.error('Erro ao buscar as ofertas da cotação:', error);
            });
    }, [quotationId]);

    async function handleApproveOffer() {
        try {
            const requestData = {
                quotationId: quotationId,
                status: "Aprovado"
            };    
            const requestDataString = JSON.stringify(requestData);

            const res = await fetch(`http://localhost:8000/api/offer`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: requestDataString
            });
            const result = await res.json();

            if (res.status !== 200) {
                toast.error('Ocorreu um erro ao cancelar a oferta, tente novamente', { position: 'bottom-right' });
            } else {
                //TODO chamar tela de agendamento de coleta
                console.log("Oferta aprovada");
            } 
        } catch (error) {
            toast.error('Ocorreu um erro ao criar aprovar a oferta, tente novamente', { position: 'bottom-right' });
        } 
    }

    async function handleRejectOffer() {
        try {
            const requestData = {
                quotationId: quotationId,
                status: "Reprovado"
            };    
            const requestDataString = JSON.stringify(requestData);

            const res = await fetch(`http://localhost:8000/api/offer`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: requestDataString
            });
            const result = await res.json();

            if (res.status !== 200) {
                toast.error('Ocorreu um erro ao cancelar a oferta, tente novamente', { position: 'bottom-right' });
            } else {
                toast.success('Oferta Reprovada!', { position: 'bottom-right' });
            } 
        } catch (error) {
            toast.error('Ocorreu um erro ao criar reprovar a oferta, tente novamente', { position: 'bottom-right' });
        } 
    }

    return (
        <Modal {...props} title={'Oferta da cotação'}>
            {Array.isArray(quotationOffers) && quotationOffers.map((offer, index) => (
                <div key={index}>
                    <FormTextInput label="Subtotal" value={offer.subtotal} isDisabled />
                    <FormTextInput label="Impostos" value={offer.taxes} isDisabled />
                    <FormTextInput label="Total" value={offer.total} isDisabled />
                    <FormTextInput label="Previsão de entrega" value={offer.deliveryForecast} isDisabled />
                </div>
            ))}
            {quotationOffers.length > 0 && (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <ContainedButton type={'submit'} style={{ width: '250px' }} onClick={handleRejectOffer}>Reprovar</ContainedButton>
                    <ContainedButton type={'submit'} style={{ width: '250px' }} onClick={handleApproveOffer}>Aprovar</ContainedButton>
                </div>
            )}
        </Modal>
    );
}

export default QuotationOffersModal;
