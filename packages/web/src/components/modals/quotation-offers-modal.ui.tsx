import { useEffect, useState } from 'react';
import Modal, { TModalProps } from '../custom.modal';
import FormTextInput from '@/components/form/text-input/form-text-input.ui';
import { ContainedButton } from '@/components/button/button.ui';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import HttpRequestPort from '@/infra/http-request/http-request.port';
import TOfferModel from '@shared/models/Offer.model';
import { HContainer, VContainer } from '../container/container.ui';
import Divider from '../divider';
import Spacings from '@/styles/tokens/spacing';
import { Text } from '@chakra-ui/react';
import { OFFER_STATUS } from '@shared/constants/offer-status.const';

type TQuotationOffersModal = TModalProps & {
    quotationId?: number;
    isOpenCreateModal: boolean;
    closeCreateModalHandler: () => void;
};

function QuotationOffersModal({ quotationId, closeCreateModalHandler, ...props }: TQuotationOffersModal) {
    const navigate = useNavigate();
    const [quotationOffers, setQuotationOffers] = useState<TOfferModel[]>([]);

    const verifyOfferIsValid = (status: string) =>
        status === OFFER_STATUS.OPENED || status === OFFER_STATUS.IN_NEGOCIATION;

    useEffect(() => {
        (async () => {
            if (!quotationId) return;
            await handleFindOffersByQuotation(quotationId);
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [quotationId]);

    async function handleFindOffersByQuotation(quotationId?: number) {
        const response = (await HttpRequestPort.get({
            path: `/api/offerByQuotation/${quotationId}`,
        })) as TOfferModel[];

        const filteredOffers = response?.filter((offer) => verifyOfferIsValid(offer.status));

        setQuotationOffers(filteredOffers);

        if (filteredOffers.length === 0) {
            toast.error('Ainda não há nenhuma oferta disponível', { position: 'bottom-right' });
        }
    }

    async function handleApproveOffer(offer: TOfferModel) {
        try {
            const result: any = await HttpRequestPort.post({
                path: '/api/approveOffer',
                body: { offer },
            });

            if (result) {
                navigate(`/quotation/schedule-collection/${offer?.id}`, { state: result });
                console.log('Oferta aprovada');
            }
        } catch (error) {
            toast.error('Ocorreu um erro ao criar aprovar a oferta, tente novamente', { position: 'bottom-right' });
        }
    }

    async function handleRejectOffer(offerId?: number) {
        try {
            if (!offerId) return;

            const requestData = {
                id: offerId,
                quotationId,
                status: OFFER_STATUS.DISAPPROVED,
            };

            const response = await HttpRequestPort.put({ path: '/api/offer', body: requestData });

            console.log(response);

            await handleFindOffersByQuotation(quotationId);

            toast.success('Oferta Reprovada!', { position: 'bottom-right' });
        } catch (error) {
            toast.error('Ocorreu um erro ao criar reprovar a oferta, tente novamente', { position: 'bottom-right' });
        } finally {
            closeCreateModalHandler(); // Move this line here
        }
    }

    return (
        <Modal {...props} title={'Oferta da cotação'}>
            <VContainer style={{ gap: Spacings.LARGE, height: '80vh', overflow: 'auto' }}>
                {quotationOffers?.map((offer, index) => {
                    return (
                        <VContainer key={index} style={{ gap: Spacings.LARGE }}>
                            <Text fontWeight={'bold'}>#{offer.id}</Text>
                            <Divider />
                            <FormTextInput label="Subtotal" value={offer.subtotal} isDisabled />
                            <FormTextInput label="Impostos" value={offer.taxes} isDisabled />
                            <FormTextInput label="Total" value={offer.total} isDisabled />
                            <FormTextInput label="Previsão de entrega" value={offer.deliveryForecast} isDisabled />

                            <HContainer
                                style={{
                                    gap: Spacings.MEDIUM,
                                    justifyContent: 'center',
                                }}
                            >
                                <ContainedButton
                                    type={'submit'}
                                    style={{ width: '250px' }}
                                    onClick={() => handleRejectOffer(offer?.id)}
                                >
                                    Reprovar
                                </ContainedButton>

                                <ContainedButton
                                    type={'submit'}
                                    style={{ width: '250px' }}
                                    onClick={() => handleApproveOffer(offer)}
                                >
                                    Aprovar
                                </ContainedButton>
                            </HContainer>
                        </VContainer>
                    );
                })}
            </VContainer>
        </Modal>
    );
}

export default QuotationOffersModal;
