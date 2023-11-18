import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Text } from '@chakra-ui/react';
import React from 'react';
import styled from '@emotion/styled'; // Importe a função styled
import t from '@/infra/i18n';
import HttpRequestPort from '@/infra/http-request/http-request.port';
import { DELIVERY_PROCESS_STATUS } from '@shared/constants/delivery-process-status.const';

const ConfirmModalButton = styled.button`
    align-self: center;
    background-color: #0c8ce9;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    margin-bottom: 10px;
    margin-top: 10px;
`;

type ConfirmModalProps = {
    isOpen: boolean;
    onClose: () => void;
    message: string;
};

const ConfirmModal: React.FC<ConfirmModalProps> = ({ deliveryProcessId, isOpen, onClose, message }) => {
    async function onConfirmDeliveryPress() {
        await HttpRequestPort.post({
            path: '/api/update-delivery-process-status',
            body: {
                deliveryProcessId: deliveryProcessId,
                status: DELIVERY_PROCESS_STATUS.DELIVERY_CONFIRMED,
            },
        });

        onClose();
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="md">
            <ModalOverlay />
            <ModalContent justifyContent="center" alignItems="center">
                <ModalHeader>Confirmar Entrega</ModalHeader>
                <ModalCloseButton />

                <ModalBody>
                    <Text color="black">{message}</Text>
                </ModalBody>

                <ConfirmModalButton onClick={onConfirmDeliveryPress}>{t('Confirm')}</ConfirmModalButton>
            </ModalContent>
        </Modal>
    );
};

export default ConfirmModal;
