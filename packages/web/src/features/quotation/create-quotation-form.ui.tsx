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

    return (
        <form {...props} onSubmit={methods.handleSubmit(onSubmit)}>
            <VContainer gap={Spacings.MEDIUM}>
                <SectionTitleText>{t('Quotation.NewQuotationForm.NewQuotation')}</SectionTitleText>

                <HContainer gap={Spacings.MEDIUM} style={{ justifyContent: 'space-evenly' }}>
                    <VContainer gap={Spacings.MEDIUM} style={{ width: '40%' }}>
                        <FormTextInput label={'CPF'} name={'cpf'} methods={methods} />
                        <FormSelectInput label={'Tipo da remessa'} name={'remittanceType'} methods={methods}>
                            <option value={null}></option>
                            <option value={ITEM_REMITTANCE_TYPE.DOCUMENTS}>{ITEM_REMITTANCE_TYPE.DOCUMENTS}</option>
                            <option value={ITEM_REMITTANCE_TYPE.ELECTRONICS}>{ITEM_REMITTANCE_TYPE.ELECTRONICS}</option>
                            <option value={ITEM_REMITTANCE_TYPE.FLAMMABLE}>{ITEM_REMITTANCE_TYPE.FLAMMABLE}</option>
                            <option value={ITEM_REMITTANCE_TYPE.FRAGILE}>{ITEM_REMITTANCE_TYPE.FRAGILE}</option>
                        </FormSelectInput>
                    </VContainer>

                    <VContainer gap={Spacings.MEDIUM} style={{ width: '40%' }}>
                        <FormTextInput label="Email" name={'email'} methods={methods} />
                        <FormTextInput label="Peso da remessa" name={'remittanceWeight'} methods={methods} />
                    </VContainer>
                </HContainer>

                <HContainer gap={Spacings.MEDIUM} style={{ justifyContent: 'space-evenly' }}>
                    <VContainer gap={Spacings.MEDIUM} style={{ width: '40%' }}>
                        <SectionTitleText>Endereço de origem</SectionTitleText>

                        <HContainer gap={Spacings.MEDIUM}>
                            <FormTextInput label="Cep" name={'originAddress.zipCode'} methods={methods} />
                            <FormTextInput label="Número" name={'originAddress.number'} methods={methods} />
                        </HContainer>

                        <FormTextInput label="Cidade" name={'originAddress.city'} methods={methods} />
                        <FormTextInput label="Rua" name={'originAddress.streetAddress'} methods={methods} />
                        <FormTextInput label="País" name={'originAddress.country'} methods={methods} />
                        <FormTextInput label="Estado" name={'originAddress.state'} methods={methods} />
                    </VContainer>

                    <VContainer gap={Spacings.MEDIUM} style={{ width: '40%' }}>
                        <SectionTitleText>Endereço de destino</SectionTitleText>

                        <HContainer gap={Spacings.MEDIUM}>
                            <FormTextInput label="Cep" name={'destinationAddress.zipCode'} methods={methods} />
                            <FormTextInput label="Número" name={'destinationAddress.number'} methods={methods} />
                        </HContainer>
                        <FormTextInput label="Cidade" name={'destinationAddress.city'} methods={methods} />
                        <FormTextInput label="Rua" name={'destinationAddress.streetAddress'} methods={methods} />
                        <FormTextInput label="País" name={'destinationAddress.country'} methods={methods} />
                        <FormTextInput label="Estado" name={'destinationAddress.state'} methods={methods} />
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
