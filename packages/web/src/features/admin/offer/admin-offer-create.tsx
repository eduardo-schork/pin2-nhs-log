import { FormLabel, Modal, Select } from '@chakra-ui/react'; // Importe o componente Select do Chakra UI
import { ContainedButton } from '@/components/button/button.ui';
import { HContainer } from '@/components/container/container.ui';
import Divider from '@/components/divider';
import QuotationItem from '@/components/offer/quotation-item.ui';
import Colors from '@/styles/tokens/color';
import Spacings from '@/styles/tokens/spacing';
import normalizeAddressLabel from '@/utils/normalize-address-label';
import { ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import { VContainer } from '@/components/container/container.ui';
import FormTextInput from '@/components/form/text-input/form-text-input.ui';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import HttpRequestPort from '@/infra/http-request/http-request.port';
import t from '@/infra/i18n';
import MaskedTextInput from '@/components/form/text-input/masked-text-input.ui';

function AdminCreateOffer({ isOpen, onClose, data, ...props }) {
    const [selectedFleet, setSelectedFleet] = useState('');
    const [fleetVehicles, setFleetVehicles] = useState([]); // Estado para armazenar a lista de veículos
    const [taxes, setTaxes] = useState(generateRandomNumber(1, 100).toFixed(2));
    const [subtotal, setSubtotal] = useState('');
    const [total, setTotal] = useState('');
    const [deliveryForecast, setDeliveryForecast] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    function generateRandomNumber(min, max) {
        return Math.random() * (max - min) + min;
    }

    async function handleSubmit() {
        try {
            if (!data.id || !deliveryForecast || !selectedFleet || !subtotal || !taxes || !total) {
                toast.error('É necessário que todos os campos estejam preenchidos!', { position: 'bottom-right' });
                return;
            }

            const formattedForecast = deliveryForecast.replace(/[/]/g, '-');
            const splittedString = formattedForecast.split('-');
            const stringDate = `${splittedString[1]}-${splittedString[0]}-${splittedString[2]}`;

            const date = new Date(stringDate);

            const formData = {
                quotationId: data.id,
                status: 'Em aberto',
                deliveryForecast: date,
                fleetVehicleId: selectedFleet,
                subtotal: subtotal,
                taxes: taxes,
                total: total,
            };

            await HttpRequestPort.post({ path: '/api/offer', body: formData });
            setIsSuccess(true);

            toast.success('Oferta criada com sucesso', { position: 'bottom-right' });
            onClose();
        } catch (error) {
            toast.error('Ocorreu um erro ao criar a oferta, tente novamente', { position: 'bottom-right' });
            onClose();
        }
    }

    useEffect(() => {
        (async () => {
            const response = await HttpRequestPort.get({ path: '/api/fleetVehicle ' });
            setFleetVehicles(response);
        })();
    }, []);

    useEffect(() => {
        const subtotalValue = parseFloat(subtotal);
        const taxesValue = parseFloat(taxes);

        if (!isNaN(subtotalValue) && !isNaN(taxesValue)) {
            const calculatedTotal = subtotalValue + taxesValue;
            setTotal(calculatedTotal.toFixed(2));
        } else {
            setTotal('');
        }
    }, [subtotal, taxes]);

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Criar Oferta</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VContainer {...props} gap={Spacings.LARGE}>
                        <QuotationItem.InfoTitle>#{data.id}</QuotationItem.InfoTitle>
                        <Divider borderColor={Colors.PRIMARY} />

                        <VContainer gap={Spacings.LARGE}>
                            <HContainer style={{ gap: Spacings.LARGE }}>
                                <FormTextInput isDisabled={true} label="CPF" value={data.cpf} isRequired />
                                <FormTextInput isDisabled={true} label="Email" value={data.email} isRequired />
                            </HContainer>

                            <HContainer style={{ gap: Spacings.LARGE }}>
                                <MaskedTextInput
                                    mask={'**/**/****'}
                                    label="Previsão de entrega"
                                    value={deliveryForecast}
                                    onChange={(e) => setDeliveryForecast(e.target.value)}
                                    isRequired
                                />

                                <VContainer style={{ width: '100%' }}>
                                    <FormLabel>Veículo</FormLabel>
                                    <Select
                                        placeholder="Selecionar veículo"
                                        value={selectedFleet}
                                        onChange={(event) => setSelectedFleet(event.target.value)}
                                        isRequired
                                    >
                                        {fleetVehicles.map((vehicle) => (
                                            <option key={vehicle.id} value={vehicle.id}>
                                                {vehicle.model} | {vehicle.plate}
                                            </option>
                                        ))}
                                    </Select>
                                </VContainer>
                            </HContainer>

                            <FormTextInput
                                isDisabled={true}
                                label="Endereço de origem"
                                value={normalizeAddressLabel(data.originAddress)}
                                isRequired
                            />

                            <HContainer style={{ gap: Spacings.LARGE }}>
                                <FormTextInput isDisabled={true} label="Impostos" value={taxes} isRequired />

                                <FormTextInput
                                    label="Subtotal"
                                    value={subtotal}
                                    onChange={(e) => setSubtotal(e.target.value)}
                                    isRequired
                                />
                            </HContainer>

                            <FormTextInput label="Total" isDisabled={true} value={total} isRequired />
                        </VContainer>

                        <HContainer gap={Spacings.MEDIUM} style={{ justifyContent: 'flex-end' }}>
                            <ContainedButton onClick={handleSubmit}>{t('common.Register')}</ContainedButton>
                        </HContainer>
                    </VContainer>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

export default AdminCreateOffer;
