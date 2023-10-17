import { useEffect, useState } from 'react';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import { ContainedButton } from '@/components/button/button.ui';
import TextInput from '@/components/text-input/text-input.ui';
import { useForm } from 'react-hook-form';
import t from '@/infra/i18n';
import { useNavigate } from 'react-router-dom';
import ErrorModal from './error.modal';
import { FormContainer } from './edit.styles';
import { cpf } from 'cpf-cnpj-validator';


const EditModal: React.FC<TEditModalFormValues> = ({isOpen, onClose, user}) => {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState<string | null>(null);
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [userData, setUserData] = useState({});

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
            console.log(data)
          })
          .catch((error) => {
            console.error('Erro ao buscar os dados do usuário', error);
          });
      }
    }, [isOpen, user.id]);

    async function handleFormSubmitEdition(data: any) {
        console.log(data)
        if (!data.userName || !data.userCpf || !data.userEmail) {
            setError(t('common.MissingParameter'));
            setIsErrorModalOpen(true);
        } else {
            if (!cpf.isValid(data.userCpf)) {
                setError(t('Register.cpf.invalid'));
                setIsErrorModalOpen(true);
            }
            else {
                const queryParams = new URLSearchParams({
                    userName: data.userName,
                    userCpf: data.userCpf,
                    userEmail: data.userEmail,
                });
    
                const res = await fetch(`http://localhost:8000/api/admin/login?${queryParams}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
    
                const result = await res.json();
    
                if (res.status === 200) {
                    navigate('/admin');
                } else {
                    setError(t('User.edit.notPossible'));
                    setIsErrorModalOpen(true);
                }
            }
        }
    }

    async function handleFormSubmitDelete(data: TEditModalFormValues) {
        if (!data.userEmail || !data.userPassword) {
            setError(t('common.MissingParameter'));
            setIsErrorModalOpen(true);
        } else {
            const queryParams = new URLSearchParams({
                userEmail: data.userEmail,
                userPassword: data.userPassword,
            });

            const res = await fetch(`http://localhost:8000/api/admin/login?${queryParams}`, {
                method: 'DELETE',
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
                        defaultValue={userData.user_name} 
                    />
                    <TextInput
                        {...register('userCpf')}
                        placeholder={t('Register.cpf')}
                        defaultValue={userData.user_cpf} 
                    />
                    <TextInput
                        {...register('userEmail')}
                        placeholder={t('Register.email')}
                        defaultValue={userData.user_email} 
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

export default EditModal;
