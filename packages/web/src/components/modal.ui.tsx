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

export type TModalProps = UseDisclosureProps & React.ComponentPropsWithRef<'div'> & { closeButtonText?: string };

function Modal({
    title,
    closeButtonText = 'Continuar',
    isOpen = false,
    onClose = () => {},
    children,
    ...props
}: TModalProps) {
    return (
        <>
            <ChakraModal {...props} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent minWidth="fit-content" height="fit-content">
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
