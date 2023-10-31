import React, { useState } from 'react';
import { TabPanel, TabPanels, Tabs, Button } from '@chakra-ui/react';
import BaseLayout from '@/components/layout/base-layout/base-layout.ui';
import { Divs, FormContainer, GridContainer, PageContainer, StyledTab1, StyledTab2, StyledTabList, Title, DivText, ButtonProx } from './styles';
import { HContainer, VContainer } from '@/components/container/container.ui';
import FormTextInput from '@/components/form/text-input/form-text-input.ui';
import Spacings from '@/styles/tokens/spacing';
import { useForm } from 'react-hook-form';
import t from '@/infra/i18n';
import FormSelectInput from '@/components/form/select-input/form-select-input.ui';
import { PAYMENT_TYPE } from '@shared/constants/payment-type.const';
import GeneratePix from './generate-pix.page';

type TCreateScheduleCollectionForm = {
  date: string;
  instructions: string;
  addressScheduleCollection: {
    zipCode: string;
    number: string;
    city: string;
    streetAddress: string;
    state: string;
    country: string;
  };
  totalValue: string;
  paymentType: string;
  creditCardNumber: string;
  pixKey: string;
};

PAYMENT_TYPE;

function ScheduleCollectionPage({ onSubmit, ...props }: { onSubmit: (data: TCreateScheduleCollectionForm) => void }) {
  const methods = useForm<TCreateScheduleCollectionForm>({});
  const [activeTab, setActiveTab] = useState(0);

  const handleNext = () => {
    setActiveTab((prevTab) => prevTab + 1);
  };

  return (
    <BaseLayout {...props}>
      <PageContainer withoutHeader={true}>
        <Title textAlign="center" mt="100px" fontSize="2rem">
          Agendamento de Coleta
        </Title>
        <Tabs>
          <StyledTabList>
            <StyledTab1>Agendamento</StyledTab1>
            <StyledTab2>Pagamento</StyledTab2>
          </StyledTabList>
          <GridContainer>
            <form {...props} onSubmit={methods.handleSubmit(onSubmit)} style={{ margin: '0px 0px 0px 50px' }}>
              <TabPanels>
                <TabPanel>
                  <FormContainer>
                    <Divs>
                      <VContainer gap={Spacings.MEDIUM} style={{ width: '100%' }}>
                        <FormTextInput label="Data e Horário" name={'date'} methods={methods} type='datetime-local' />
                      </VContainer>
                    </Divs>
                    <DivText>LOCAL DE COLETA</DivText>
                    <Divs>
                      <VContainer gap={Spacings.MEDIUM} style={{ width: '50%', margin: '0px 20px 0px 0px' }}>
                        <FormTextInput label="CEP" name={'addressScheduleCollection.zipCode'} methods={methods} />
                      </VContainer>
                      <HContainer gap={Spacings.MEDIUM} style={{ width: '50%' }}>
                        <FormTextInput label="Número" name={'addressScheduleCollection.number'} methods={methods} />
                      </HContainer>
                    </Divs>
                    <Divs>
                      <VContainer gap={Spacings.MEDIUM} style={{ width: '50%', margin: '0px 20px 0px 0px' }}>
                        <FormTextInput label="Cidade" name={'addressScheduleCollection.city'} methods={methods} />
                      </VContainer>
                      <HContainer gap={Spacings.MEDIUM} style={{ width: '50%' }}>
                        <FormTextInput label="Rua" name={'addressScheduleCollection.streetAddress'} methods={methods} />
                      </HContainer>
                    </Divs>
                    <Divs>
                      <VContainer gap={Spacings.MEDIUM} style={{ width: '50%', margin: '0px 20px 0px 0px' }}>
                        <FormTextInput label="País" name={'addressScheduleCollection.country'} methods={methods} />
                      </VContainer>
                      <HContainer gap={Spacings.MEDIUM} style={{ width: '50%' }}>
                        <FormTextInput label="Estado" name={'addressScheduleCollection.state'} methods={methods} />
                      </HContainer>
                    </Divs>
                    <Divs>
                      <FormTextInput label="Instruções" name={'instructions'} methods={methods} />
                    </Divs>
                  </FormContainer>
                  <ButtonProx onClick={handleNext}>
                    {t('Prox')}
                  </ButtonProx>
                </TabPanel>
                <TabPanel>
                  <FormContainer>
                    <Divs>
                      <VContainer gap={Spacings.MEDIUM} style={{ width: '50%', margin: '0px 20px 0px 0px'}}>
                        <FormTextInput label="Valor Total" name="totalValue" methods={methods} />
                      </VContainer>
                      <VContainer gap={Spacings.MEDIUM} style={{ width: '50%', margin: '0px 20px 0px 0px' }}>
                      <FormSelectInput
                        label={'Tipo de pagamento'}
                        name={'paymentType'}
                        methods={methods}
                      >
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
                     <VContainer gap={Spacings.MEDIUM} style={{ width: '50%', margin: '0px 20px 0px 0px'}}>
                       <FormTextInput label="CVC" name="cvc" methods={methods} />
                     </VContainer>
                    </Divs>
                    )}
                    {methods.watch('paymentType') === PAYMENT_TYPE.PIX && (
                      <GeneratePix />
                    )}
                  </FormContainer>
                  <ButtonProx>
                    {t('Finish')}
                  </ButtonProx>
                </TabPanel>
              </TabPanels>
            </form>
          </GridContainer>
        </Tabs>
      </PageContainer>
    </BaseLayout>
  );
}

export default ScheduleCollectionPage;
