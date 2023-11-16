import { HContainer, VContainer } from '@/components/container/container.ui';
import Divider from '@/components/divider';
import FormSelectInput from '@/components/form/select-input/form-select-input.ui';
import FormTextInput from '@/components/form/text-input/form-text-input.ui';
import Modal, { TModalProps } from '@/components/modal.ui';
import HttpRequestPort from '@/infra/http-request/http-request.port';
import Spacings from '@/styles/tokens/spacing';
import { Text } from '@chakra-ui/react';
import { DELIVERY_PROCESS_STATUS } from '@shared/constants/delivery-process-status.const';
import { OFFER_STATUS } from '@shared/constants/offer-status.const';

import TDeliveryProcessModel from '@shared/models/DeliveryProcess.model';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import styled from 'styled-components';

function ManageProcessModal({ deliveryProcess, ...props }: TModalProps & { deliveryProcess?: TDeliveryProcessModel }) {
    const offer = deliveryProcess?.offer;
    const quotation = deliveryProcess?.offer?.quotation;

    const methods = useForm({
        values: {
            taxes: offer?.taxes,
            status: deliveryProcess?.status,
            total: offer?.total,
            cte: null,
            cpf: quotation?.cpf,
            deliveryForecast: offer?.deliveryForecast,
            email: quotation?.email,
            vehicle: offer?.fleetVehicle?.plate,
            originAddress: { ...quotation?.originAddress },
            destinationAddress: { ...quotation?.destinationAddress },
        },
    });

    const formStatusValue = methods.watch('status');

    async function handleUpdateProcessStatus(status?: string) {
        if (!status) return;
        try {
            const response = await HttpRequestPort.post({
                path: '/api/update-delivery-process-status',
                body: {
                    deliveryProcessId: deliveryProcess?.id,
                    status: status,
                },
            });

            console.log({ response });

            toast.success('Processo atualizado com sucesso!');
        } catch (error) {
            methods.setValue('status', deliveryProcess?.status);
            toast.error('Ocorreu um erro ao atualizar processo, tente novamente');
        }
    }

    useEffect(() => {
        (async () => {
            if (formStatusValue != deliveryProcess?.status) {
                await handleUpdateProcessStatus(formStatusValue);
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formStatusValue]);

    if (!deliveryProcess) return;

    const verifyIsSelectStatusDisabled = (status: string) =>
        [
            DELIVERY_PROCESS_STATUS.CREATED,
            DELIVERY_PROCESS_STATUS.DELIVERY_CONFIRMED,
            DELIVERY_PROCESS_STATUS.SCHEDULED_COLLECTION,
        ].some((value) => status == value);

    return (
        <Modal {...props} title={'Editar processo'}>
            <ModalContent>
                <Text fontWeight={'bold'} fontSize={'xl'}>
                    #{deliveryProcess.id}
                </Text>

                <Divider />

                <ColumnContainer>
                    <SectionContainer>
                        <FormTextInput isDisabled label="CPF" name={'cpf'} methods={methods} />
                        <FormTextInput isDisabled label="Veiculo" name={'vehicle'} methods={methods} />
                    </SectionContainer>

                    <SectionContainer>
                        <FormTextInput isDisabled label="Email" name={'email'} methods={methods} />
                        <FormTextInput
                            isDisabled
                            label="Previsão de entrega"
                            name={'deliveryForecast'}
                            methods={methods}
                        />
                    </SectionContainer>
                </ColumnContainer>

                <ColumnContainer>
                    <SectionContainer>
                        <Text alignSelf={'center'} fontSize={'xl'} fontWeight={'bold'}>
                            Endereço de origem
                        </Text>

                        <VContainer gap={Spacings.MEDIUM}>
                            <FormTextInput isDisabled label="Cep" name={'originAddress.zipCode'} methods={methods} />

                            <FormTextInput isDisabled label="Cidade" name={'originAddress.city'} methods={methods} />
                            <FormTextInput
                                isDisabled
                                label="Rua"
                                name={'originAddress.streetAddress'}
                                methods={methods}
                            />
                            <FormTextInput isDisabled label="País" name={'originAddress.country'} methods={methods} />
                            <FormTextInput isDisabled label="Estado" name={'originAddress.state'} methods={methods} />
                            <FormTextInput
                                isDisabled
                                label="Número"
                                name={'originAddress.number'}
                                methods={methods}
                                isRequired
                            />
                        </VContainer>
                    </SectionContainer>

                    <SectionContainer>
                        <Text alignSelf={'center'} fontSize={'xl'} fontWeight={'bold'}>
                            Endereço de destino
                        </Text>

                        <VContainer gap={Spacings.MEDIUM}>
                            <FormTextInput
                                isDisabled
                                label="Cep"
                                name={'destinationAddress.zipCode'}
                                methods={methods}
                            />

                            <FormTextInput
                                isDisabled
                                label="Cidade"
                                name={'destinationAddress.city'}
                                methods={methods}
                            />
                            <FormTextInput
                                isDisabled
                                label="Rua"
                                name={'destinationAddress.streetAddress'}
                                methods={methods}
                            />
                            <FormTextInput
                                isDisabled
                                label="País"
                                name={'destinationAddress.country'}
                                methods={methods}
                            />
                            <FormTextInput
                                isDisabled
                                label="Estado"
                                name={'destinationAddress.state'}
                                methods={methods}
                            />
                            <FormTextInput
                                isDisabled
                                label="Número"
                                name={'destinationAddress.number'}
                                methods={methods}
                            />
                        </VContainer>
                    </SectionContainer>
                </ColumnContainer>

                <Divider />

                <ColumnContainer>
                    <SectionContainer>
                        <FormTextInput isDisabled label="Impostos" name={'taxes'} methods={methods} />

                        <FormSelectInput
                            isDisabled={verifyIsSelectStatusDisabled(deliveryProcess?.status)}
                            onChange={(event) => console.log({ event })}
                            label={'Status'}
                            name={'status'}
                            methods={methods}
                        >
                            <option
                                disabled={true}
                                label={DELIVERY_PROCESS_STATUS.CREATED}
                                value={DELIVERY_PROCESS_STATUS.CREATED}
                            ></option>
                            <option
                                disabled={true}
                                label={DELIVERY_PROCESS_STATUS.SCHEDULED_COLLECTION}
                                value={DELIVERY_PROCESS_STATUS.SCHEDULED_COLLECTION}
                            ></option>
                            <option
                                disabled={true}
                                label={DELIVERY_PROCESS_STATUS.INVOICED}
                                value={DELIVERY_PROCESS_STATUS.INVOICED}
                            ></option>
                            <option
                                label={DELIVERY_PROCESS_STATUS.COLLECTED}
                                value={DELIVERY_PROCESS_STATUS.COLLECTED}
                            ></option>
                            <option
                                label={DELIVERY_PROCESS_STATUS.ON_WAY}
                                value={DELIVERY_PROCESS_STATUS.ON_WAY}
                            ></option>
                            <option
                                label={DELIVERY_PROCESS_STATUS.DELIVERED}
                                value={DELIVERY_PROCESS_STATUS.DELIVERED}
                            ></option>
                            <option
                                disabled={true}
                                label={DELIVERY_PROCESS_STATUS.DELIVERY_CONFIRMED}
                                value={DELIVERY_PROCESS_STATUS.DELIVERY_CONFIRMED}
                            ></option>
                        </FormSelectInput>
                    </SectionContainer>

                    <SectionContainer>
                        <FormTextInput isDisabled label="Total" name={'total'} methods={methods} />
                        <FormTextInput isDisabled label="CTE" name={'cte'} methods={methods} />
                    </SectionContainer>
                </ColumnContainer>
            </ModalContent>
        </Modal>
    );
}

const SectionContainer = styled(VContainer)`
    gap: ${Spacings.MEDIUM};
    width: 48%;
`;

const ColumnContainer = styled(HContainer)`
    gap: ${Spacings.MEDIUM};
    justify-content: space-evenly;
`;

const ModalContent = styled(VContainer)`
    gap: ${Spacings.LARGE};
    min-width: 50vw;
    height: 60vh;
    overflow: auto;
`;

export default ManageProcessModal;
