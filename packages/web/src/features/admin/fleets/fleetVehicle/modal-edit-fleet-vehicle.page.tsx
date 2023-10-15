import { ContainedButton } from "@/components/button/button.ui";
import TextInput from "@/components/text-input/text-input.ui";
import t from "@/infra/i18n";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody } from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FormContainer } from "./create.styles";
import ErrorModal from "./error.modal";

type TEditVehicleModalProps = {
    isOpen: boolean;
    onClose: () => void;
    vehicle: Vehicle; 
  };

const EditVehicleModal: React.FC<TEditVehicleModalProps> = ({ isOpen, onClose, vehicleId }) => {
    const navigate = useNavigate();
    const { register, handleSubmit} = useForm();
    const [error, setError] = useState<string | null>(null);
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);


    const closeErrorModal = () => {
        setError(null);
        setIsErrorModalOpen(false);
    };

    async function handleFormSubmit(data: TEditVehicleModalProps) {
        if (!data.vehicleModal || !data.vehiclePlate || !data.vehicleCpfDriver || !data.vehicleRenavam) {
            setError(t('common.MissingParameter'));
            setIsErrorModalOpen(true);
        } else {
            try {
                const res = await fetch(`http://localhost:8000/api/fleetVehicle/update/${vehicleId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                if (res.status === 200) {
                    console.log(res);
                    navigate('/admin/fleet');
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
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent className="custom-modal-content" justifyContent="center" alignItems="center" size="sm">
                    <ModalHeader>Editar Veículo</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <FormContainer>
                            <p>Tem certeza que deseja deletar o veículo {vehicleId} ?</p>
                            <TextInput
                                {...register('vehicleModal')}
                                placeholder={t('Register.modal')}
                                defaultValue={vehicleId} 
                            />
                            <TextInput
                                {...register('vehiclePlate')}
                                placeholder={t('Register.plate')}
                                defaultValue={vehicleId} 
                            />
                            <TextInput
                                {...register('vehicleCpfDriver')}
                                placeholder={t('Register.cpfDriver')}
                                defaultValue={vehicleId} 
                            />
                            <TextInput
                                {...register('vehicleRenavam')}
                                placeholder={t('Register.renavam')}
                                defaultValue={vehicleId} 
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
