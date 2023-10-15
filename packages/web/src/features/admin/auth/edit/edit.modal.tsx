import { useState } from 'react'; // Importe o useState
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import { ContainedButton } from '@/components/button/button.ui';
import TextInput from '@/components/text-input/text-input.ui';
import { useForm } from 'react-hook-form';
import t from '@/infra/i18n';
import { useNavigate } from 'react-router-dom';
import ErrorModal from './error.modal';
import { FormContainer } from './edit.styles';

const EditLoginPage: React.FC<TEditLoginPageFormValues> = ({isOpen, onClose, user}) => {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState<string | null>(null);
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

    const closeErrorModal = () => {
        setError(null);
        setIsErrorModalOpen(false);
    };

    async function handleFormSubmitEdition(data: any) {
        if (!data.userName || !data.userCpf || !data.userEmail || !data.userPassword) {
            setError(t('common.MissingParameter'));
            setIsErrorModalOpen(true);
        } else {
            const queryParams = new URLSearchParams({
                userName: data.userName,
                userCpf: data.userCpf,
                userEmail: data.userEmail,
                userPassword: data.userPassword,
            });

            const res = await fetch(`http://localhost:8000/api/admin/login?${queryParams}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const result = await res.json();

            if (res.status === 200) {
                console.log(result);
                navigate('/');
            } else {
                setError(t('Login.userNotFound'));
                setIsErrorModalOpen(true);
            }
        }
    }

    async function handleFormSubmitDelete(data: TEditLoginPageFormValues) {
        if (!data.userEmail || !data.userPassword) {
            setError(t('common.MissingParameter'));
            setIsErrorModalOpen(true);
        } else {
            const queryParams = new URLSearchParams({
                userEmail: data.userEmail,
                userPassword: data.userPassword,
            });

            const res = await fetch(`http://localhost:8000/api/admin/login?${queryParams}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const result = await res.json();

            if (res.status === 200) {
                console.log(result);
                navigate('/');
            } else {
                setError(t('Login.userNotFound'));
                setIsErrorModalOpen(true);
            }
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className="custom-modal-content" justifyContent="center" alignItems="center" size="sm">
            <ModalHeader>Editar Usuário</ModalHeader>
            <ModalCloseButton/>
            <ModalBody>
                <FormContainer>
                    <TextInput
                        {...register('userName')}
                        placeholder={t('Register.name')}
                        defaultValue={user} 
                    />
                    <TextInput
                        {...register('userCpf')}
                        placeholder={t('Register.cpf')}
                        defaultValue={user} 
                    />
                    <TextInput
                        {...register('userEmail')}
                        placeholder={t('Register.email')}
                        defaultValue={user} 
                    />
                    <TextInput
                        {...register('userPassword')}
                        placeholder={t('Register.password')}
                        defaultValue={user} 
                    />
                    <ContainedButton onClick={handleSubmit(handleFormSubmitEdition)}>
                    {t('common.Save')}
                    </ContainedButton>

                    <ContainedButton onClick={handleSubmit(handleFormSubmitDelete)}>
                    {t('common.Delete')}
                    </ContainedButton>

                    <ErrorModal isOpen={isErrorModalOpen} onClose={closeErrorModal} errorMessage={error || ''} />
                </FormContainer>
            </ModalBody>
            </ModalContent>
    </Modal>
    );
}

export default EditLoginPage;
