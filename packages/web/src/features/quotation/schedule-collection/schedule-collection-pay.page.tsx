import { useEffect, useState } from 'react';
import { TabPanel } from '@chakra-ui/react';
import { Divs, FormContainer, ButtonProx } from './styles';
import { VContainer } from '@/components/container/container.ui';
import FormTextInput from '@/components/form/text-input/form-text-input.ui';
import Spacings from '@/styles/tokens/spacing';
import t from '@/infra/i18n';
import FormSelectInput from '@/components/form/select-input/form-select-input.ui';
import { PAYMENT_TYPE } from '@shared/constants/payment-type.const';
import GeneratePix from './generate-pix.page';
import HttpRequestPort from '@/infra/http-request/http-request.port';
import { useLocation, useNavigate } from 'react-router-dom';
import TOfferModel from '@shared/models/Offer.model';

function ScheduleCollectionPay({ methods, ...props }: { methods: any }) {
    const location = useLocation();
    const locationState = location.state;
    const deliveryProcessId = locationState?.deliveryProcessId;
    const navigate = useNavigate();
    const [currentOffer, setCurrentOffer] = useState<TOfferModel | null>(null);

    useEffect(() => {
        methods.setValue('totalValue', currentOffer?.total);
    }, [currentOffer]);

    useEffect(() => {
        (async () => {
            const result = (await HttpRequestPort.get({ path: `/api/offer/${locationState?.offerId}` })) as TOfferModel;
            setCurrentOffer(result);
        })();
    }, [locationState?.offerId]);

    async function handleFinish() {
        const { totalValue, paymentType } = methods.getValues();

        const requestData = {
            totalValue,
            paymentType: paymentType,
            deliveryProcessId: deliveryProcessId,
            quotationEmail: currentOffer?.quotation?.email,
        };

        try {
            const response = await HttpRequestPort.post({ path: '/api/payment/create', body: requestData });
            navigate('/delivery-process');
        } catch (error) {
            console.error(error);
            // setError(t('Register.error'));
            // setIsErrorModalOpen(true);
        }
    }

    return (
        <TabPanel {...props}>
            <FormContainer>
                <Divs>
                    <VContainer gap={Spacings.MEDIUM} style={{ width: '50%', margin: '0px 20px 0px 0px' }}>
                        <FormTextInput
                            label="Valor Total"
                            name="totalValue"
                            methods={methods}
                            value={currentOffer?.total}
                            isDisabled={true}
                        />
                    </VContainer>

                    <VContainer gap={Spacings.MEDIUM} style={{ width: '50%', margin: '0px 20px 0px 0px' }}>
                        <FormSelectInput label={'Tipo de pagamento'} name={'paymentType'} methods={methods}>
                            <option value={null}></option>
                            <option value={PAYMENT_TYPE.CREDIT_CARD}>{PAYMENT_TYPE.CREDIT_CARD}</option>
                            <option value={PAYMENT_TYPE.PIX}>{PAYMENT_TYPE.PIX}</option>
                        </FormSelectInput>
                    </VContainer>
                </Divs>
                {methods.watch('paymentType') === PAYMENT_TYPE.CREDIT_CARD && (
                    <Divs>
                        <VContainer gap={Spacings.MEDIUM} style={{ width: '50%', margin: '0px 20px 0px 0px' }}>
                            <FormTextInput label="Número do Cartão" name="numberCard" methods={methods} />
                        </VContainer>
                        <VContainer gap={Spacings.MEDIUM} style={{ width: '50%', margin: '0px 20px 0px 0px' }}>
                            <FormTextInput label="CVC" name="cvc" methods={methods} />
                        </VContainer>
                    </Divs>
                )}
                {methods.watch('paymentType') === PAYMENT_TYPE.PIX && <GeneratePix />}
            </FormContainer>
            <ButtonProx onClick={handleFinish}>{t('Finish')}</ButtonProx>
        </TabPanel>
    );
}

export default ScheduleCollectionPay;
