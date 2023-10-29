import { ContainedButton } from '@/components/button/button.ui';
import { HContainer, VContainer } from '@/components/container/container.ui';
import FormSelectInput from '@/components/form/select-input/form-select-input.ui';
import FormTextInput from '@/components/form/text-input/form-text-input.ui';
import t from '@/infra/i18n';
import Spacings from '@/styles/tokens/spacing';
import { Text } from '@chakra-ui/react';
import { ITEM_REMITTANCE_TYPE } from '@shared/constants/item-remittance-type.const';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import React, { useState } from 'react';
import { toast } from 'react-toastify';


type TCreateQuotationForm = {
  cpf: number;
  email: string;
  remittanceType: string;
  remittanceWeight: number;

  originAddress: {
    zipCode: string;
    number: string;
    city: string;
    streetAddress: string;
    state: string;
    country: string;
  };

  destinationAddress: {
    zipCode: string;
    number: string;
    city: string;
    streetAddress: string;
    state: string;
    country: string;
  };
};

ITEM_REMITTANCE_TYPE;

function CreateQuotationForm({ onSubmit, ...props }: { onSubmit: (data: TCreateQuotationForm) => void }) {
  const methods = useForm<TCreateQuotationForm>({});
  const [originAddressInfo, setOriginAddressInfo] = useState({});
  const [destinationAddressInfo, setDestinationAddressInfo] = useState({});

  const fetchOriginAddressInfo = async (cep) => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      if (response.status == 400) {
        toast.error('CEP não encontrado. Tente novamente!', { position: 'bottom-left' });
        setOriginAddressInfo({});
        } else {
          const data = await response.json();
          setOriginAddressInfo(data);
          methods.setValue('originAddress.city', data.localidade);
          methods.setValue('originAddress.state', data.uf);
      }
    } catch (error) {
        toast.error('CEP não encontrado. Tente novamente!', { position: 'bottom-left' });
        setOriginAddressInfo({});
    }
  };

  const fetchDestinationAddressInfo = async (cep) => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      if (response.status == 400) {
        toast.error('CEP não encontrado. Tente novamente!', { position: 'bottom-right' });
        setDestinationAddressInfo({});
        } else {
          const data = await response.json();
          setDestinationAddressInfo(data);
          methods.setValue('destinationAddress.city', data.localidade);
          methods.setValue('destinationAddress.state', data.uf);
        }
    } catch (error) {
        toast.error('CEP não encontrado. Tente novamente!', { position: 'bottom-right' });
        setDestinationAddressInfo({});
    }
  };

  return (
    <form {...props} onSubmit={methods.handleSubmit(onSubmit)}>
      <VContainer gap={Spacings.MEDIUM}>
        <SectionTitleText>{t('Quotation.NewQuotationForm.NewQuotation')}</SectionTitleText>

        <HContainer gap={Spacings.MEDIUM} style={{ justifyContent: 'space-evenly' }}>
          <VContainer gap={Spacings.MEDIUM} style={{ width: '48%' }}>
            <FormTextInput label={'CPF'} name={'cpf'} methods={methods} isRequired />
            <FormSelectInput label={'Tipo da remessa'} name={'remittanceType'} methods={methods} isRequired>
              <option value={null}></option>
              <option value={ITEM_REMITTANCE_TYPE.DOCUMENTS}>{ITEM_REMITTANCE_TYPE.DOCUMENTS}</option>
              <option value={ITEM_REMITTANCE_TYPE.ELECTRONICS}>{ITEM_REMITTANCE_TYPE.ELECTRONICS}</option>
              <option value={ITEM_REMITTANCE_TYPE.FLAMMABLE}>{ITEM_REMITTANCE_TYPE.FLAMMABLE}</option>
              <option value={ITEM_REMITTANCE_TYPE.FRAGILE}>{ITEM_REMITTANCE_TYPE.FRAGILE}</option>
            </FormSelectInput>
          </VContainer>

          <VContainer gap={Spacings.MEDIUM} style={{ width: '48%' }}>
            <FormTextInput label="Email" name={'email'} methods={methods} isRequired />
            <FormTextInput label="Peso da remessa" name={'remittanceWeight'} methods={methods} isRequired />
          </VContainer>
        </HContainer>

        <HContainer gap={Spacings.MEDIUM} style={{ justifyContent: 'space-evenly' }}>
          <VContainer gap={Spacings.MEDIUM} style={{ width: '48%' }}>
            <SectionTitleText>Endereço de origem</SectionTitleText>

            <HContainer gap={Spacings.MEDIUM}>
              <FormTextInput label="Cep" name={'originAddress.zipCode'} methods={methods} isRequired />
              <HContainer gap={Spacings.MEDIUM}>
                <ContainedButton
                  onClick={() => {
                    const cep = methods.getValues('originAddress.zipCode');
                    fetchOriginAddressInfo(cep);
                  }}
                >
                  Buscar Endereço
                </ContainedButton>
              </HContainer>
            </HContainer>

            <VContainer gap={Spacings.MEDIUM}>
              <FormTextInput label="Cidade" name={'originAddress.city'} methods={methods} defaultValue={originAddressInfo.localidade} />
              <FormTextInput label="Rua" name={'originAddress.streetAddress'} methods={methods} isRequired/>
              <FormTextInput label="País" name={'originAddress.country'} methods={methods} value="Brasil" />
              <FormTextInput label="Estado" name={'originAddress.state'} methods={methods} defaultValue={originAddressInfo.uf} />
              <FormTextInput label="Número" name={'originAddress.number'} methods={methods} isRequired/>
            </VContainer>
          </VContainer>

          <VContainer gap={Spacings.MEDIUM} style={{ width: '48%' }}>
            <SectionTitleText>Endereço de destino</SectionTitleText>

            <HContainer gap={Spacings.MEDIUM}>
              <FormTextInput label="Cep" name={'destinationAddress.zipCode'} methods={methods} isRequired />
              <HContainer gap={Spacings.MEDIUM}>
                <ContainedButton
                  onClick={() => {
                    const cep = methods.getValues('destinationAddress.zipCode');
                    fetchDestinationAddressInfo(cep);
                  }}
                >
                  Buscar Endereço
                </ContainedButton>
              </HContainer>
            </HContainer>

            <VContainer gap={Spacings.MEDIUM}>
              <FormTextInput label="Cidade" name={'destinationAddress.city'} methods={methods} defaultValue={destinationAddressInfo.localidade} />
              <FormTextInput label="Rua" name={'destinationAddress.streetAddress'} methods={methods}isRequired/>
              <FormTextInput label="País" name={'destinationAddress.country'} methods={methods} defaultValue="Brasil" />
              <FormTextInput label="Estado" name={'destinationAddress.state'} methods={methods} defaultValue={destinationAddressInfo.uf} />
              <FormTextInput label="Número" name={'destinationAddress.number'} methods={methods} isRequired/>
            </VContainer>
          </VContainer>
        </HContainer>

        <ContainedButton type={'submit'} style={{ width: '250px' }}>
          Enviar
        </ContainedButton>
      </VContainer>
    </form>
  );
}

const SectionTitleText = styled(Text).attrs({
  fontSize: '2xl',
  alignSelf: 'center',
})`
  font-weight: bold;
`;

export default CreateQuotationForm;
