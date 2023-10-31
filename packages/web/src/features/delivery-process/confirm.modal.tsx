import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Text } from "@chakra-ui/react";
import React from "react";
import styled from "@emotion/styled"; // Importe a função styled
import t from "@/infra/i18n";

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

const ConfirmModal: React.FC<ConfirmModalProps> = ({ isOpen, onClose, message }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent justifyContent="center" alignItems="center">
        <ModalHeader>Confirmar Entrega</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text color="black">{message}</Text>
        </ModalBody>
        <ConfirmModalButton>
            {t('Confirm')}
        </ConfirmModalButton>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmModal;
