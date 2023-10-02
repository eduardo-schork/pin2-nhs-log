import { ContainedButton } from '@/components/button/button.ui';
import { HContainer, VContainer } from '@/components/container/container.ui';
import FormSelectInput from '@/components/form/select-input/form-select-input.ui';
import FormTextInput from '@/components/form/text-input/form-text-input.ui';
import t from '@/infra/i18n';
import Spacings from '@/styles/tokens/spacing';
import { Text } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

type TCreateQuotationForm = {
    cpf: number;
    email: string;
    remittanceType: string;
    remittanceWeight: number;

    originAddress: {
        cep: string;
        number: string;
        city: string;
        street: string;
        district: string;
        country: string;
    };

    destinationAddress: {
        cep: string;
        number: string;
        city: string;
        street: string;
        district: string;
        country: string;
    };
};

function CreateQuotationForm({ onSubmit, ...props }: { onSubmit: (data: TCreateQuotationForm) => void }) {
    const methods = useForm<TCreateQuotationForm>();

    return (
        <form {...props} onSubmit={methods.handleSubmit(onSubmit)}>
            <VContainer gap={Spacings.MEDIUM}>
                <SectionTitleText>{t('Quotation.NewQuotationForm.NewQuotation')}</SectionTitleText>

                <HContainer gap={Spacings.MEDIUM} style={{ justifyContent: 'space-evenly' }}>
                    <VContainer gap={Spacings.MEDIUM} style={{ width: '40%' }}>
                        <FormTextInput label={'CPF'} name={'cpf'} methods={methods} />
                        <FormSelectInput label={'Tipo da remessa'} name={'remittanceType'} methods={methods} />
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
                            <FormTextInput label="Cep" name={'originAddress.cep'} methods={methods} />
                            <FormTextInput label="Número" name={'originAddress.number'} methods={methods} />
                        </HContainer>
                        <FormTextInput label="Cidade" name={'originAddress.city'} methods={methods} />
                        <FormTextInput label="Rua" name={'originAddress.street'} methods={methods} />
                        <FormTextInput label="País" name={'originAddress.country'} methods={methods} />
                        <FormTextInput label="Bairro" name={'originAddress.district'} methods={methods} />
                    </VContainer>

                    <VContainer gap={Spacings.MEDIUM} style={{ width: '40%' }}>
                        <SectionTitleText>Endereço de destino</SectionTitleText>

                        <HContainer gap={Spacings.MEDIUM}>
                            <FormTextInput label="Cep" name={'destinationAddress.cep'} methods={methods} />
                            <FormTextInput label="Número" name={'destinationAddress.number'} methods={methods} />
                        </HContainer>
                        <FormTextInput label="Cidade" name={'destinationAddress.city'} methods={methods} />
                        <FormTextInput label="Rua" name={'destinationAddress.street'} methods={methods} />
                        <FormTextInput label="País" name={'destinationAddress.country'} methods={methods} />
                        <FormTextInput label="Bairro" name={'destinationAddress.district'} methods={methods} />
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
