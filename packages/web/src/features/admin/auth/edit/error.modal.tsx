import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Text } from '@chakra-ui/react';

type ErrorModalProps = {
    isOpen: boolean;
    onClose: () => void;
    errorMessage: string;
};

const ErrorModal: React.FC<ErrorModalProps> = ({ isOpen, onClose, errorMessage }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="md">
            <ModalOverlay />
            <ModalContent className="custom-modal-error" justifyContent="center" alignItems="center">
                <ModalHeader>Erro</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text color="red">{errorMessage}</Text>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default ErrorModal;
