import React from 'react';
import {Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton} from '@chakra-ui/react';
import TextInput from '@/components/text-input/text-input.ui';

    const EditVehicleModal = ({ isOpen, onClose }) => {


    return (
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>Editar Veículo</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            { }
            { }
            { }
            </ModalBody>
        </ModalContent>
        </Modal>
    );
    };

    export default EditVehicleModal;
