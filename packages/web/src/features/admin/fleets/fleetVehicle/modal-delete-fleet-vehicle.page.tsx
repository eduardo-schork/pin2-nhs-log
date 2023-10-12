import React from 'react';
import {Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton} from '@chakra-ui/react';
import TextInput from '@/components/text-input/text-input.ui';

    const DeleteVehicleModal = ({ isOpen, onClose }) => {


    return (
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>Deletar Veículo</ModalHeader>
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

    export default DeleteVehicleModal;
