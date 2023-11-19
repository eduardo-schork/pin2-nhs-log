import { ContainedButton } from '@/components/button/button.ui';
import { HContainer, VContainer } from '@/components/container/container.ui';
import FormSelectInput from '@/components/form/select-input/form-select-input.ui';
import FormTextInput from '@/components/form/text-input/form-text-input.ui';
import t from '@/infra/i18n';
import Spacings from '@/styles/tokens/spacing';
import { Text } from '@chakra-ui/react';
import { ITEM_REMITTANCE_TYPE } from '@shared/constants/item-remittance-type.const';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { pt as yupPt } from 'yup-locale-pt';
import QuotationItem from '@/components/quotation/quotation-item.ui';
import MaskedTextInput from '@/components/form/text-input/masked-text-input.ui';
yup.setLocale(yupPt);

const schema = yup
    .object()
    .shape({
        cpf: yup.string().label('CPF').required(),
        email: yup.string().label('Email').required(),
        remittanceType: yup.string().label('Tipo da remessa').required(),
        remittanceWeight: yup.number().label('Peso da remessa').required(),

        originAddress: yup
            .object()
            .shape({
                zipCode: yup.string().label('CEP').required(),
                number: yup.string().label('Número').required(),
                city: yup.string().label('Cidade').required(),
                streetAddress: yup.string().label('Rua').required(),
                state: yup.string().label('Estado').required(),
                country: yup.string().label('País').required(),
            })
            .required(),

        destinationAddress: yup
            .object()
            .shape({
                zipCode: yup.string().label('CEP').required(),
                number: yup.string().label('Número').required(),
                city: yup.string().label('Cidade').required(),
                streetAddress: yup.string().label('Rua').required(),
                state: yup.string().label('Estado').required(),
                country: yup.string().label('País').required(),
            })
            .required(),
    })
    .required();

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

async function fetchCepInfo(cep: string) {
    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        if (response.status == 400) {
            toast.error('CEP não encontrado. Tente novamente!', { position: 'bottom-left' });
        } else {
            const data = await response.json();
            return data;
        }

        return null;
    } catch (error) {
        toast.error('CEP não encontrado. Tente novamente!', { position: 'bottom-left' });
    }
}

function CreateQuotationForm({ onSubmit, ...props }: { onSubmit: (data: TCreateQuotationForm) => void }) {
    const methods = useForm<TCreateQuotationForm>({
        resolver: yupResolver(schema),
    });

    const fetchOriginAddressInfo = async () => {
        const cep = methods.getValues('originAddress.zipCode');
        const response = fetchCepInfo(cep);
        const data = await response;

        methods.setValue('originAddress.city', data?.localidade);
        methods.setValue('originAddress.state', data?.uf);
    };

    const fetchDestinationAddressInfo = async () => {
        const cep = methods.getValues('destinationAddress.zipCode');
        const response = fetchCepInfo(cep);
        const data = await response;

        methods.setValue('destinationAddress.city', data?.localidade);
        methods.setValue('destinationAddress.state', data?.uf);
    };

    return (
        <QuotationItem.Container>
            <form {...props} novalidate="novalidate" onSubmit={methods.handleSubmit(onSubmit)}>
                <VContainer gap={Spacings.MEDIUM}>
                    <SectionTitleText>{t('Quotation.NewQuotationForm.NewQuotation')}</SectionTitleText>

                    <HContainer gap={Spacings.MEDIUM} style={{ justifyContent: 'space-evenly' }}>
                        <VContainer gap={Spacings.MEDIUM} style={{ width: '48%' }}>
                            <MaskedTextInput
                                mask={'***.***.***-**'}
                                type={'numeric'}
                                label={'CPF'}
                                name={'cpf'}
                                methods={methods}
                                isRequired
                            />
                            <FormSelectInput
                                label={'Tipo da remessa'}
                                name={'remittanceType'}
                                methods={methods}
                                isRequired
                            >
                                <option value={undefined}></option>
                                <option value={ITEM_REMITTANCE_TYPE.DOCUMENTS}>{ITEM_REMITTANCE_TYPE.DOCUMENTS}</option>
                                <option value={ITEM_REMITTANCE_TYPE.ELECTRONICS}>
                                    {ITEM_REMITTANCE_TYPE.ELECTRONICS}
                                </option>
                                <option value={ITEM_REMITTANCE_TYPE.FLAMMABLE}>{ITEM_REMITTANCE_TYPE.FLAMMABLE}</option>
                                <option value={ITEM_REMITTANCE_TYPE.FRAGILE}>{ITEM_REMITTANCE_TYPE.FRAGILE}</option>
                            </FormSelectInput>
                        </VContainer>

                        <VContainer gap={Spacings.MEDIUM} style={{ width: '48%' }}>
                            <FormTextInput label="Email" name={'email'} methods={methods} isRequired />
                            <FormTextInput
                                type={'numeric'}
                                label="Peso da remessa (KG)"
                                name={'remittanceWeight'}
                                methods={methods}
                                isRequired
                            />
                        </VContainer>
                    </HContainer>

                    <HContainer gap={Spacings.MEDIUM} style={{ justifyContent: 'space-evenly' }}>
                        <VContainer gap={Spacings.MEDIUM} style={{ width: '48%' }}>
                            <SectionTitleText>Endereço de origem</SectionTitleText>

                            <HContainer gap={Spacings.MEDIUM}>
                                <FormTextInput
                                    label="Cep"
                                    error={methods?.formState?.errors?.originAddress?.zipCode?.message}
                                    name={'originAddress.zipCode'}
                                    methods={methods}
                                    isRequired
                                />
                                <HContainer gap={Spacings.MEDIUM}>
                                    <ContainedButton style={{ alignSelf: 'flex-end' }} onClick={fetchOriginAddressInfo}>
                                        Buscar Endereço
                                    </ContainedButton>
                                </HContainer>
                            </HContainer>

                            <VContainer gap={Spacings.MEDIUM}>
                                <FormTextInput
                                    label="Cidade"
                                    error={methods?.formState?.errors?.originAddress?.city?.message}
                                    name={'originAddress.city'}
                                    methods={methods}
                                />
                                <FormTextInput
                                    label="Rua"
                                    error={methods?.formState?.errors?.originAddress?.streetAddress?.message}
                                    name={'originAddress.streetAddress'}
                                    methods={methods}
                                    isRequired
                                />
                                <FormTextInput
                                    label="País"
                                    error={methods?.formState?.errors?.originAddress?.country?.message}
                                    name={'originAddress.country'}
                                    methods={methods}
                                    value="Brasil"
                                />
                                <FormTextInput
                                    label="Estado"
                                    error={methods?.formState?.errors?.originAddress?.state?.message}
                                    name={'originAddress.state'}
                                    methods={methods}
                                />
                                <FormTextInput
                                    label="Número"
                                    error={methods?.formState?.errors?.originAddress?.number?.message}
                                    name={'originAddress.number'}
                                    methods={methods}
                                    isRequired
                                />
                            </VContainer>
                        </VContainer>

                        <VContainer gap={Spacings.MEDIUM} style={{ width: '48%' }}>
                            <SectionTitleText>Endereço de destino</SectionTitleText>

                            <HContainer gap={Spacings.MEDIUM}>
                                <FormTextInput
                                    label="Cep"
                                    error={methods?.formState?.errors?.destinationAddress?.zipCode?.message}
                                    name={'destinationAddress.zipCode'}
                                    methods={methods}
                                    isRequired
                                />
                                <HContainer gap={Spacings.MEDIUM}>
                                    <ContainedButton
                                        style={{ alignSelf: 'flex-end' }}
                                        onClick={fetchDestinationAddressInfo}
                                    >
                                        Buscar Endereço
                                    </ContainedButton>
                                </HContainer>
                            </HContainer>

                            <VContainer gap={Spacings.MEDIUM}>
                                <FormTextInput
                                    label="Cidade"
                                    error={methods?.formState?.errors?.destinationAddress?.city?.message}
                                    name={'destinationAddress.city'}
                                    methods={methods}
                                />
                                <FormTextInput
                                    label="Rua"
                                    error={methods?.formState?.errors?.destinationAddress?.streetAddress?.message}
                                    name={'destinationAddress.streetAddress'}
                                    methods={methods}
                                    isRequired
                                />
                                <FormTextInput
                                    label="País"
                                    error={methods?.formState?.errors?.destinationAddress?.country?.message}
                                    name={'destinationAddress.country'}
                                    methods={methods}
                                    defaultValue="Brasil"
                                />
                                <FormTextInput
                                    label="Estado"
                                    error={methods?.formState?.errors?.destinationAddress?.state?.message}
                                    name={'destinationAddress.state'}
                                    methods={methods}
                                />
                                <FormTextInput
                                    label="Número"
                                    error={methods?.formState?.errors?.destinationAddress?.number?.message}
                                    name={'destinationAddress.number'}
                                    methods={methods}
                                    isRequired
                                />
                            </VContainer>
                        </VContainer>
                    </HContainer>

                    <ContainedButton type={'submit'} style={{ width: '200px', marginTop: Spacings.MEDIUM }}>
                        Enviar
                    </ContainedButton>
                </VContainer>
            </form>
        </QuotationItem.Container>
    );
}

const SectionTitleText = styled(Text).attrs({
    fontSize: '2xl',
    alignSelf: 'center',
})`
    font-weight: bold;
`;

export default CreateQuotationForm;
