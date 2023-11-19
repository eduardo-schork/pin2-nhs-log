import TextInput from '@/components/text-input/text-input.ui';
import t from '@/infra/i18n';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormContainer } from './create.styles';
import ErrorModal from './error.modal';
import TFleetVehicleModel from '@shared/models/FleetVehicle.model';
import { ContainedButton } from '@/components/button/button.ui';

type TEditVehicleModalProps = {
    isOpen: boolean;
    onClose: () => void;
    vehicle: TFleetVehicleModel;
};

const EditVehicleModal: React.FC<TEditVehicleModalProps> = ({ isOpen, onClose, vehicle }) => {
    const [error, setError] = useState<string | null>(null);
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

    const { register, handleSubmit } = useForm<Pick<TFleetVehicleModel, 'model' | 'plate' | 'cpfDriver' | 'renavam'>>();

    const closeErrorModal = () => {
        setError(null);
        setIsErrorModalOpen(false);
    };

    async function handleFormSubmit(data: Pick<TFleetVehicleModel, 'model' | 'plate' | 'cpfDriver' | 'renavam'>) {
        if (!data.model || !data.plate || !data.cpfDriver || !data.renavam) {
            setError(t('common.MissingParameter'));
            setIsErrorModalOpen(true);
            return;
        }

        try {
            const res = await fetch(`http://localhost:8000/api/fleetVehicle/update/${vehicle.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (res.status === 200) {
                window.location.reload();
            } else {
                setError(t('Update.error'));
                setIsErrorModalOpen(true);
            }
        } catch (error) {
            console.error(error);
            setError(t('Update.error'));
            setIsErrorModalOpen(true);
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent className="custom-modal-content" justifyContent="center" alignItems="center">
                <ModalHeader>Editar Veículo</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormContainer>
                        <p>Tem certeza que deseja deletar o veículo {vehicle.id} ?</p>
                        <TextInput
                            {...register('model')}
                            placeholder={t('Register.modal')}
                            defaultValue={vehicle.model}
                        />
                        <TextInput
                            {...register('plate')}
                            placeholder={t('Register.plate')}
                            defaultValue={vehicle.plate}
                            maxLength={7}
                        />
                        <TextInput
                            {...register('cpfDriver')}
                            placeholder={t('Register.cpfDriver')}
                            defaultValue={vehicle.cpfDriver}
                        />
                        <TextInput
                            {...register('renavam')}
                            placeholder={t('Register.renavam')}
                            defaultValue={vehicle.renavam}
                        />
                        <ContainedButton onClick={handleSubmit(handleFormSubmit)}>
                            {t('common.Register')}
                        </ContainedButton>

                        <ErrorModal isOpen={isErrorModalOpen} onClose={closeErrorModal} errorMessage={error || ''} />
                    </FormContainer>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default EditVehicleModal;
