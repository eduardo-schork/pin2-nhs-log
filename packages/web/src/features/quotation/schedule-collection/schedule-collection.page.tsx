import { useState } from 'react';
import { TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import BaseLayout from '@/components/layout/base-layout/base-layout.ui';
import {
    Divs,
    FormContainer,
    GridContainer,
    PageContainer,
    StyledTab1,
    StyledTab2,
    StyledTabList,
    Title,
    DivText,
    ButtonProx,
} from './styles';
import { HContainer, VContainer } from '@/components/container/container.ui';
import FormTextInput from '@/components/form/text-input/form-text-input.ui';
import Spacings from '@/styles/tokens/spacing';
import { useForm } from 'react-hook-form';
import t from '@/infra/i18n';
import ScheduleCollectionPay from './schedule-collection-pay.page';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';

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

function ScheduleCollectionPage({ onSubmit, ...props }: { onSubmit: (data: TCreateScheduleCollectionForm) => void }) {
    const methods = useForm<TCreateScheduleCollectionForm>({});
    const [activeTab, setActiveTab] = useState(0);
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [originAddressInfo, setOriginAddressInfo] = useState({});

    const location = useLocation();

    const deliveryProcessId = location.state.deliveryProcessId;

    const closeErrorModal = () => {
        setError(null);
        setIsErrorModalOpen(false);
    };

    const fetchOriginAddressInfo = async (cep) => {
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            if (response.status == 400) {
                toast.error('CEP não encontrado. Tente novamente!', { position: 'bottom-left' });
                setOriginAddressInfo({});
            } else {
                const data = await response.json();
                setOriginAddressInfo(data);
                methods.setValue('addressScheduleCollection.city', data.localidade);
                methods.setValue('addressScheduleCollection.state', data.uf);
                methods.setValue('addressScheduleCollection.streetAddress', data.logradouro);
            }
        } catch (error) {
            toast.error('CEP não encontrado. Tente novamente!', { position: 'bottom-left' });
            setOriginAddressInfo({});
        }
    };

    async function handleNext() {
        const data = methods.getValues();

        const requestData = {
            zipCode: data.addressScheduleCollection.zipCode,
            number: data.addressScheduleCollection.number,
            city: data.addressScheduleCollection.city,
            streetAddress: data.addressScheduleCollection.streetAddress,
            state: data.addressScheduleCollection.state,
            country: data.addressScheduleCollection.country,
            deliveryProcessId: deliveryProcessId,
        };

        try {
            const res = await fetch(`http://localhost:8000/api/address`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            if (res.status === 201) {
                const addressData = await res.json();
                const addressId = addressData.id;

                createCollectionSchedule(data, addressId, deliveryProcessId);

                setActiveTab(1);
            } else {
                setError(t('Register.error'));
                setIsErrorModalOpen(true);
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function createCollectionSchedule(data, addressId, deliveryProcessId) {
        const requestDataWithId = {
            idAddress: addressId,
            date: data.date,
            instructions: data.instructions,
            deliveryProcessId: deliveryProcessId,
        };

        try {
            const secondRes = await fetch(`http://localhost:8000/api/collection-schedule/create?${requestDataWithId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestDataWithId),
            });

            if (secondRes.status === 200) {
                console.log(secondRes);
            } else {
                setError(t('Register.error'));
                setIsErrorModalOpen(true);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <BaseLayout {...props}>
            <PageContainer withoutHeader={true}>
                <Title textAlign="center" mt="100px" fontSize="2rem">
                    Agendamento de Coleta
                </Title>
                <Tabs index={activeTab} onChange={(index) => setActiveTab(index)}>
                    <StyledTabList>
                        <StyledTab1>Agendamento</StyledTab1>
                        <StyledTab2>Pagamento</StyledTab2>
                    </StyledTabList>
                    <GridContainer>
                        <form
                            {...props}
                            onSubmit={methods.handleSubmit(onSubmit)}
                            style={{ margin: '0px 0px 0px 50px' }}
                        >
                            <TabPanels>
                                <TabPanel>
                                    <FormContainer>
                                        <Divs>
                                            <VContainer gap={Spacings.MEDIUM} style={{ width: '100%' }}>
                                                <FormTextInput
                                                    label="Data e Horário"
                                                    name={'date'}
                                                    methods={methods}
                                                    type="datetime-local"
                                                />
                                            </VContainer>
                                        </Divs>
                                        <DivText>LOCAL DE COLETA</DivText>
                                        <Divs>
                                            <HContainer gap={Spacings.MEDIUM} style={{ width: '100%' }}>
                                                <FormTextInput
                                                    label="CEP"
                                                    name={'addressScheduleCollection.zipCode'}
                                                    methods={methods}
                                                    isRequired
                                                />
                                                <HContainer gap={Spacings.MEDIUM}>
                                                    <ButtonAddress
                                                        onClick={() => {
                                                            const cep = methods.getValues(
                                                                'addressScheduleCollection.zipCode',
                                                            );
                                                            fetchOriginAddressInfo(cep);
                                                        }}
                                                    >
                                                        Buscar Endereço
                                                    </ButtonAddress>
                                                </HContainer>
                                            </HContainer>
                                        </Divs>
                                        <Divs>
                                            <VContainer
                                                gap={Spacings.MEDIUM}
                                                style={{ width: '50%', margin: '0px 20px 0px 0px' }}
                                            >
                                                <FormTextInput
                                                    label="Cidade"
                                                    name={'addressScheduleCollection.city'}
                                                    methods={methods}
                                                    defaultValue={originAddressInfo.localidade}
                                                />
                                            </VContainer>
                                            <HContainer gap={Spacings.MEDIUM} style={{ width: '50%' }}>
                                                <FormTextInput
                                                    label="Rua"
                                                    name={'addressScheduleCollection.streetAddress'}
                                                    methods={methods}
                                                    defaultValue={originAddressInfo.logradouro}
                                                />
                                            </HContainer>
                                        </Divs>
                                        <Divs>
                                            <VContainer
                                                gap={Spacings.MEDIUM}
                                                style={{ width: '50%', margin: '0px 20px 0px 0px' }}
                                            >
                                                <FormTextInput
                                                    label="País"
                                                    name={'addressScheduleCollection.country'}
                                                    methods={methods}
                                                    value="Brasil"
                                                />
                                            </VContainer>
                                            <HContainer gap={Spacings.MEDIUM} style={{ width: '50%' }}>
                                                <FormTextInput
                                                    label="Estado"
                                                    name={'addressScheduleCollection.state'}
                                                    methods={methods}
                                                    defaultValue={originAddressInfo.uf}
                                                />
                                            </HContainer>
                                        </Divs>
                                        <Divs>
                                            <VContainer
                                                gap={Spacings.MEDIUM}
                                                style={{ width: '50%', margin: '0px 20px 0px 0px' }}
                                            >
                                                <FormTextInput
                                                    label="Número"
                                                    name={'addressScheduleCollection.number'}
                                                    methods={methods}
                                                    isRequired
                                                />
                                            </VContainer>
                                            <HContainer gap={Spacings.MEDIUM} style={{ width: '50%' }}>
                                                <FormTextInput
                                                    label="Instruções"
                                                    name={'instructions'}
                                                    methods={methods}
                                                />
                                            </HContainer>
                                        </Divs>
                                    </FormContainer>
                                    <ButtonProx
                                        onClick={() => {
                                            handleNext();
                                            setActiveTab(1);
                                        }}
                                    >
                                        {t('Prox')}
                                    </ButtonProx>

                                    {/* <ErrorModal isOpen={isErrorModalOpen} onClose={closeErrorModal} errorMessage={error || ''} /> */}
                                </TabPanel>
                                <ScheduleCollectionPay methods={methods} />
                            </TabPanels>
                        </form>
                    </GridContainer>
                </Tabs>
            </PageContainer>
        </BaseLayout>
    );
}

export default ScheduleCollectionPage;
