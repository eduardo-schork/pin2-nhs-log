import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Text } from '@chakra-ui/react';
import TextInput from '@/components/text-input/text-input.ui';
import { ContainedButton } from '@/components/button/button.ui';
import t from '@/infra/i18n';
import { useState } from 'react';
import { FormContainer } from './create.styles';
import { useForm } from 'react-hook-form';
import ErrorModal from './error.modal';
import { toast } from 'react-toastify';

type TCreateVehiclePageFormValues = {
    vehicleModal: string;
    vehiclePlate: string;
    vehicleCpfDriver: string;
    vehicleRenavam: string;
};

type TCreateVehicleModalProps = any;

const CreateVehicleModal: React.FC<TCreateVehicleModalProps> = ({ isOpen, onClose, onCreateVehicle }) => {
    const { register, handleSubmit, reset } = useForm<TCreateVehiclePageFormValues>();

    const [error, setError] = useState<string | null>(null);
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

    const [formData, setFormData] = useState<TCreateVehiclePageFormValues>({
        vehicleModal: '',
        vehiclePlate: '',
        vehicleCpfDriver: '',
        vehicleRenavam: '',
    });

    const closeErrorModal = () => {
        setError(null);
        setIsErrorModalOpen(false);
    };

    async function handleFormSubmit(data: TCreateVehiclePageFormValues) {
        if (!data.vehicleModal || !data.vehiclePlate || !data.vehicleCpfDriver || !data.vehicleRenavam) {
            setError(t('common.MissingParameter'));
            setIsErrorModalOpen(true);
            return;
        }

        const requestData = new URLSearchParams({
            vehicleModal: data.vehicleModal,
            vehiclePlate: data.vehiclePlate,
            vehicleCpfDriver: data.vehicleCpfDriver,
            vehicleRenavam: data.vehicleRenavam,
        });

        try {
            await fetch(`http://localhost:8000/api/fleetVehicle/create?${requestData}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            reset();

            setFormData({
                vehicleModal: '',
                vehiclePlate: '',
                vehicleCpfDriver: '',
                vehicleRenavam: '',
            });

            toast.success('Sucesso! O veículo foi cadastrado.');

            if (onCreateVehicle) onCreateVehicle();
            onClose();
        } catch (error) {
            console.error(error);
            setError(t('Register.error'));
            setIsErrorModalOpen(true);
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent className="custom-modal-content" justifyContent="center" alignItems="center">
                <ModalHeader>Cadastro de Veículo</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormContainer>
                        <TextInput
                            {...register('vehicleModal')}
                            placeholder={t('Register.modal')}
                            value={formData.vehicleModal}
                            onChange={(e) => setFormData({ ...formData, vehicleModal: e.target.value })}
                        />
                        <TextInput
                            {...register('vehiclePlate')}
                            placeholder={t('Register.plate')}
                            value={formData.vehiclePlate}
                            onChange={(e) => {
                                const inputValue = e.target.value;
                                if (inputValue.length <= 7) {
                                    setFormData({ ...formData, vehiclePlate: inputValue });
                                }
                            }}
                            maxLength={7}
                        />
                        <TextInput
                            {...register('vehicleCpfDriver')}
                            placeholder={t('Register.cpfDriver')}
                            value={formData.vehicleCpfDriver}
                            onChange={(e) => setFormData({ ...formData, vehicleCpfDriver: e.target.value })}
                        />
                        <TextInput
                            {...register('vehicleRenavam')}
                            placeholder={t('Register.renavam')}
                            value={formData.vehicleRenavam} // Use o valor do estado formData
                            onChange={(e) => setFormData({ ...formData, vehicleRenavam: e.target.value })}
                        />
                        <ContainedButton onClick={handleSubmit(handleFormSubmit)}>
                            <Text>{t('common.Register')}</Text>
                        </ContainedButton>
                        <ErrorModal isOpen={isErrorModalOpen} onClose={closeErrorModal} errorMessage={error || ''} />
                    </FormContainer>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default CreateVehicleModal;
