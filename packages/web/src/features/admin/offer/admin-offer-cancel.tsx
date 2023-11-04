import { Select } from "@chakra-ui/react"; // Importe o componente Select do Chakra UI
import { ContainedButton } from '@/components/button/button.ui';
import { HContainer } from '@/components/container/container.ui';
import Spacings from '@/styles/tokens/spacing';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';

function AdminCancelOfer({ isOpen, onClose, data, ...props }) {
    const [isSuccess, setIsSuccess] = useState(false); 

    async function handleSubmit(){
        try {
            const requestData = {
                quotationId: data.id,
                status: "Cancelado"
            };    
                const requestDataString = JSON.stringify(requestData);
    
                const res = await fetch(`http://localhost:8000/api/offer`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: requestDataString
                });
                const result = await res.json();
    
                if(res.status != 200){
                    toast.error('Ocorreu um erro ao cancelar a oferta, tente novamente', { position: 'bottom-right' });
                    onClose();
                } else{
                    setIsSuccess(true); 
                    toast.success('Oferta cancelada com sucesso', { position: 'bottom-right' });
                    onClose();
                } 
            } catch (error) {
                toast.error('Ocorreu um erro ao criar a oferta, tente novamente', { position: 'bottom-right' });
                    
            }     
        }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent justifyContent="center" alignItems="center" size="md">
                <ModalHeader>Deseja cancelar a oferta da cotação #{data.id}?</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                        <HContainer gap={Spacings.LARGE} style={{ justifyContent: 'center' }}>
                            <ContainedButton onClick={handleSubmit}>Cancelar</ContainedButton>
                        </HContainer>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

export default AdminCancelOfer;
