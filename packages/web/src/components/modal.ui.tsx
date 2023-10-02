import {
    Modal as ChakraModal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    UseDisclosureProps,
} from '@chakra-ui/react';
import { ContainedButton } from './button/button.ui';

function Modal({
    title,
    closeButtonText = 'Continuar',
    isOpen = false,
    onClose = () => {},
    children,
    ...props
}: UseDisclosureProps & React.ComponentPropsWithRef<'div'> & { closeButtonText?: string }) {
    return (
        <>
            <ChakraModal {...props} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent style={{ alignSelf: 'center' }}>
                    <ModalHeader>{title}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>{children}</ModalBody>

                    <ModalFooter>
                        <ContainedButton onClick={onClose}>{closeButtonText}</ContainedButton>
                    </ModalFooter>
                </ModalContent>
            </ChakraModal>
        </>
    );
}

export default Modal;
