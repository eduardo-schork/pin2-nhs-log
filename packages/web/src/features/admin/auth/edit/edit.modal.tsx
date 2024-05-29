import { useEffect, useState } from 'react';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import { ContainedButton } from '@/components/button/button.ui';
import TextInput from '@/components/text-input/text-input.ui';
import { useForm } from 'react-hook-form';
import t from '@/infra/i18n';
import { useNavigate } from 'react-router-dom';
import TUserModel from '@shared/models/User.model';
import ErrorModal from './error.modal';
import { FormContainer } from './edit.styles';
import { cpf } from 'cpf-cnpj-validator';
import { HContainer } from '@/components/container/container.ui';

type TEditModalFormValues = any;
const missingFieldsError = 'Todos os campos devem ser editados!';

const EditModal: React.FC<TEditModalFormValues> = ({ isOpen, onClose, user }) => {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState<string | null>(null);
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [userData, setUserData] = useState<TUserModel>();

    const closeErrorModal = () => {
        setError(null);
        setIsErrorModalOpen(false);
    };

    useEffect(() => {
        if (isOpen) {
            fetch(`http://localhost:8000/api/admin/get?${user}`)
                .then((response) => response.json())
                .then((data) => {
                    setUserData(data);
                })
                .catch((error) => {
                    console.error('Erro ao buscar os dados do usuário', error);
                });
        }
    }, [isOpen, user.id]);

    async function handleFormSubmitEdition(data: any) {
        if (!data.userName || !data.userCpf || !data.userEmail) {
            setError(missingFieldsError);
            setIsErrorModalOpen(true);
        } else {
            if (!cpf.isValid(data.userCpf)) {
                setError(t('Register.cpf.invalid'));
                setIsErrorModalOpen(true);
            } else {
                const queryParams = new URLSearchParams({
                    id: userData?.id,
                    name: data.userName,
                    cpf: data.userCpf,
                    email: data.userEmail,
                });

                const res = await fetch(`http://localhost:8000/api/admin?${queryParams}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const result = await res.json();
                onClose();
                navigate('/admin', { state: { userId: result } });
            }
        }
    }

    async function handleFormSubmitDelete() {
        const queryParams = new URLSearchParams({
            id: userData?.id,
        });

        const res = await fetch(`http://localhost:8000/api/admin?${queryParams}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        onClose();
        navigate('/');
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent className="custom-modal-content" justifyContent="center" alignItems="center" size="sm">
                <ModalHeader>Editar Usuário</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormContainer>
                        <TextInput
                            {...register('userName')}
                            placeholder={t('Register.name')}
                            defaultValue={userData?.name}
                        />
                        <TextInput
                            {...register('userCpf')}
                            placeholder={t('Register.cpf')}
                            defaultValue={userData?.cpf}
                        />
                        <TextInput
                            {...register('userEmail')}
                            placeholder={t('Register.email')}
                            defaultValue={userData?.email}
                        />

                        <HContainer style={{ justifyContent: 'space-between' }}>
                            <ContainedButton onClick={handleSubmit(handleFormSubmitDelete)}>
                                {t('common.Delete')}
                            </ContainedButton>

                            <ContainedButton data-testid="save-button" onClick={handleSubmit(handleFormSubmitEdition)}>
                                {t('common.Save')}
                            </ContainedButton>
                        </HContainer>

                        <ErrorModal isOpen={isErrorModalOpen} onClose={closeErrorModal} errorMessage={error || ''} />
                    </FormContainer>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default EditModal;
