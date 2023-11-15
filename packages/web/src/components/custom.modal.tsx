import {
    Modal as ChakraModal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    UseDisclosureProps,
} from '@chakra-ui/react';

export type TModalProps = UseDisclosureProps & React.ComponentPropsWithRef<'div'> & { closeButtonText?: string };

function Modal({ title, isOpen = false, onClose = () => {}, children, ...props }: TModalProps) {
    return (
        <>
            <ChakraModal {...props} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent style={{ alignSelf: 'center' }}>
                    <ModalHeader>{title}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>{children}</ModalBody>
                </ModalContent>
            </ChakraModal>
        </>
    );
}

export default Modal;
