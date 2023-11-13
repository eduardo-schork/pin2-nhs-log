import { useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalCloseButton,
    Button,
} from '@chakra-ui/react';
import t from '@/infra/i18n';
import HttpRequestPort from '@/infra/http-request/http-request.port';
import TFleetModel from '@shared/models/Fleet.model';

const DeleteFleetModal = ({ isOpen, onClose, fleet }: any & { fleet: TFleetModel }) => {
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

    const handleDeleteFlee = async () => {
        try {
            await HttpRequestPort.delete({ path: `/api/fleet/delete/${fleet.id}` });

            console.log('Fleet deleted successfully');
            window.location.reload();
        } catch (ex) {
            console.error(ex);
            setIsErrorModalOpen(true);
        }
    };

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Deletar Veículo</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <p>Tem certeza que deseja deletar a frota {fleet.name} ?</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="red" mr={3} onClick={handleDeleteFlee}>
                            Confirmar Exclusão
                        </Button>
                        <Button onClick={onClose}>Cancelar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Modal
                isOpen={isErrorModalOpen}
                onClose={() => {
                    setIsErrorModalOpen(false);
                    onClose();
                }}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Erro</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <p>{t('common.VehicleInFleet')}</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            onClick={() => {
                                setIsErrorModalOpen(false);
                                onClose();
                            }}
                        >
                            Fechar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default DeleteFleetModal;
