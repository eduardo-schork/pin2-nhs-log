import { Select } from "@chakra-ui/react"; // Importe o componente Select do Chakra UI
import { ContainedButton } from '@/components/button/button.ui';
import { HContainer } from '@/components/container/container.ui';
import Divider from '@/components/divider';
import QuotationItem from '@/components/offer/quotation-item.ui';
import Colors from '@/styles/tokens/color';
import Spacings from '@/styles/tokens/spacing';
import normalizeAddressLabel from '@/utils/normalize-address-label';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import { VContainer } from '@/components/container/container.ui';
import FormTextInput from '@/components/form/text-input/form-text-input.ui';
import { FormattedNumber } from 'react-intl';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { CheckCircleIcon } from '@chakra-ui/icons';

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

    async function handleSubmit(){
        try {
            if(!data.id || !deliveryForecast || !selectedFleet || !subtotal || !taxes || !total){
                toast.error('É necessário que todos os campos estejam preenchidos!', { position: 'bottom-right' });
            }
            else{
                const formData = {
                    quotationId: data.id,
                    status: "Em aberto",
                    deliveryForecast: deliveryForecast,
                    fleetVehicleId: selectedFleet,
                    subtotal: subtotal,
                    taxes: taxes,
                    total: total,
                };    
                const formDataString = JSON.stringify(formData);
    
                const res = await fetch(`http://localhost:8000/api/offer`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: formDataString
                });
                const result = await res.json();
    
                if(res.status != 200){
                    toast.error('Ocorreu um erro ao criar a oferta, tente novamente', { position: 'bottom-right' });
                    onClose();
                } else{
                    setIsSuccess(true); 
                    toast.success('Oferta criada com sucesso', { position: 'bottom-right' });
                    onClose();
                }
            }
        } catch (error) {
            toast.error('Ocorreu um erro ao criar a oferta, tente novamente', { position: 'bottom-right' });
        }
        
    }

    useEffect(() => {
        fetch('http://localhost:8000/api/fleetVehicle')
            .then((response) => response.json())
            .then((data) => {
                setFleetVehicles(data);
            })
            .catch((error) => {
                console.error('Erro ao buscar os veículos:', error);
            });
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
            <ModalContent justifyContent="center" alignItems="center" w="80%">
                <ModalHeader>Criar Oferta</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <QuotationItem.Container {...props}>
                        <QuotationItem.InfoTitle>#{data.id}
                        </QuotationItem.InfoTitle>
                        <Divider borderColor={Colors.PRIMARY} />
                        <VContainer gap={Spacings.EXTRA_LARGE}>
                            <FormTextInput label="CPF" value={data.cpf} isRequired />
                            <FormTextInput label="Email" value={data.email} isRequired />
                            <FormTextInput label="Previsão de entrega" value={deliveryForecast} onChange={(e) => setDeliveryForecast(e.target.value)} isRequired />
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
                            <FormTextInput label="Endereço de origem" value={normalizeAddressLabel(data.originAddress)} isRequired />
                            <FormTextInput label="Subtotal" value={subtotal} onChange={(e) => setSubtotal(e.target.value)} isRequired />
                            <FormTextInput label="Impostos" value={taxes} isRequired />
                            <FormTextInput label="Total" value={total} isRequired />
                            <Divider borderColor={Colors.PRIMARY} />
                        </VContainer>
                        <HContainer gap={Spacings.MEDIUM} style={{ justifyContent: 'center' }}>
                            <ContainedButton onClick={handleSubmit}>Salvar</ContainedButton>
                        </HContainer>
                    </QuotationItem.Container>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

export default AdminCreateOffer;
