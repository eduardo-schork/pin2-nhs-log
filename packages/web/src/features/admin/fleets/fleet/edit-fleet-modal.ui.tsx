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
import { useForm } from 'react-hook-form';
import FormTextInput from '@/components/form/text-input/form-text-input.ui';
import { ContainedButton } from '@/components/button/button.ui';
import { HContainer } from '@/components/container/container.ui';
import Spacings from '@/styles/tokens/spacing';

const EditFleetModal = ({ isOpen, onClose, fleet }: any & { fleet: TFleetModel }) => {
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

    async function onSubmit(data: any) {
        try {
            await HttpRequestPort.put({
                path: `/api/fleet`,
                body: {
                    id: fleet?.id,
                    name: data?.name,
                },
            });

            window.location.reload();
        } catch (ex) {
            console.error(ex);
            setIsErrorModalOpen(true);
        }
    }

    const methods = useForm<{ name: string }>({});

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Editar Veículo</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form
                            style={{ gap: Spacings.MEDIUM, display: 'flex', flexDirection: 'column' }}
                            onSubmit={methods.handleSubmit(onSubmit)}
                        >
                            <FormTextInput
                                defaultValue={fleet?.name} methods={methods} name="name" />
                            <HContainer style={{ alignSelf: 'flex-end', gap: Spacings.MEDIUM }}>
                                <ContainedButton 
                                    onClick={onClose}>Cancelar</ContainedButton>
                                <ContainedButton 
                                className={'confirm-edit-button'}
                                type={'submit'}>Confirmar edição</ContainedButton>
                            </HContainer>
                        </form>
                    </ModalBody>
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

export default EditFleetModal;
