import React, { useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton, Button } from '@chakra-ui/react';
import t from '@/infra/i18n';

const DeleteVehicleModal = ({ isOpen, onClose, vehicleId }) => {
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

    const handleDeleteVehicle = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/fleetVehicle/delete/${vehicleId}`, {
                method: 'DELETE',
            });

            if (response.status === 200) {
                console.log('Vehicle deleted successfully');
                window.location.reload();
            } else {
                setIsErrorModalOpen(true);
            }
        } catch (ex) {
            console.error(ex);
            setIsErrorModalOpen(true);
        }
    };

    const closeErrorModal = () => {
        setIsErrorModalOpen(false);
    };

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Deletar Veículo</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <p>Tem certeza que deseja deletar o veículo {vehicleId} ?</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="red" mr={3} onClick={handleDeleteVehicle}>
                            Confirmar Exclusão
                        </Button>
                        <Button onClick={onClose}>Cancelar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Modal isOpen={isErrorModalOpen} onClose={() => { setIsErrorModalOpen(false); onClose(); }}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Erro</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <p>{t('common.VehicleInFleet')}</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={() => { setIsErrorModalOpen(false); onClose(); }}>Fechar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default DeleteVehicleModal;
