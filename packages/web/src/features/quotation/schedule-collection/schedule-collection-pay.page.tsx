import React, { useEffect, useState } from 'react';
import { TabPanel } from '@chakra-ui/react';
import { Divs, FormContainer, ButtonProx } from './styles';
import { VContainer } from '@/components/container/container.ui';
import FormTextInput from '@/components/form/text-input/form-text-input.ui';
import Spacings from '@/styles/tokens/spacing';
import t from '@/infra/i18n';
import FormSelectInput from '@/components/form/select-input/form-select-input.ui';
import { PAYMENT_TYPE } from '@shared/constants/payment-type.const';
import GeneratePix from './generate-pix.page';
import { useLocation } from 'react-router-dom';
import HttpRequestPort from '@/infra/http-request/http-request.port';
import { useNavigate } from 'react-router-dom';

type TCreatePaymentForm = {
    totalValue: string;
    paymentType: string;
    creditCardNumber: string;
    pixKey: string;
};

function ScheduleCollectionPay({
    methods,
    onSubmit,
    ...props
}: {
    methods: any;
    onSubmit: (data: TCreatePaymentForm) => void;
}) {
    const location = useLocation();
    const quotationEmail = location.state.quotationEmail || '';
    const [currentOffer, setCurrentOffer] = useState<any | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const offerId = location.state.offerId;
            const result = await HttpRequestPort.get({ path: `/api/offer/${offerId}` });
            setCurrentOffer(result);
        })();
    }, []);

    async function handleFinish() {
        const { totalValue, paymentType } = methods.getValues();

        let mappedPaymentType;

        if (paymentType === PAYMENT_TYPE.CREDIT_CARD) {
            mappedPaymentType = 1;
        } else if (paymentType === PAYMENT_TYPE.PIX) {
            mappedPaymentType = 2;
        } else {
            mappedPaymentType = 0;
        }
        const deliveryProcessId = location.state.deliveryProcessId;

        const requestData = {
            totalValue,
            paymentType: mappedPaymentType,
            deliveryProcessId: deliveryProcessId,
            quotationEmail: quotationEmail,
        };

        console.log(requestData);

        try {
            const res = await fetch(`http://localhost:8000/api/payment/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            if (res.status === 201) {
                console.log(res);
                navigate('/delivery-process');
            } else {
                setError(t('Register.error'));
                setIsErrorModalOpen(true);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <TabPanel>
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
