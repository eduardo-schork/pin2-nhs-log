import { useState } from 'react'; // Importe o useState
import { Text } from '@chakra-ui/react';
import RegisterBackground from '@/assets/register-page.png';
import { ContainedButton } from '@/components/button/button.ui';
import TextInput from '@/components/text-input/text-input.ui';
import { LoginText, TextContainer, FormContainer, ImageContainer, PageContainer } from './register.styles';
import { useForm } from 'react-hook-form';
import t from '@/infra/i18n';
import { useNavigate } from 'react-router-dom';
import ErrorModal from './error.modal';
import { cpf } from 'cpf-cnpj-validator';

type TRegisterPageFormValues = {
    userName: string;
    userCpf: string;
    userEmail: string;
    userPassword: string;
};

function RegisterPage({ ...props }) {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm<TRegisterPageFormValues>();
    const [error, setError] = useState<string | null>(null);
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

    const closeErrorModal = () => {
        setError(null);
        setIsErrorModalOpen(false);
    };

    async function handleFormSubmit(data: TRegisterPageFormValues) {
        if (!data.userName || !data.userCpf || !data.userEmail || !data.userPassword) {
            setError(t('common.MissingParameter'));
            setIsErrorModalOpen(true);
        } else {
            if (!cpf.isValid(data.userCpf)) {
                setError(t('Register.cpf.invalid'));
                setIsErrorModalOpen(true);
            } else {
                const requestData = new URLSearchParams({
                    userName: data.userName,
                    userCpf: data.userCpf,
                    userEmail: data.userEmail,
                    userPassword: data.userPassword,
                });

                try {
                    const res = await fetch(`http://localhost:8000/api/admin/register?${requestData}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                    if (res.status === 200) {
                        console.log(res);
                        navigate('/');
                    } else {
                        setError(t('Register.error'));
                        setIsErrorModalOpen(true);
                    }
                } catch (error) {
                    console.error(error);
                    setError(t('Register.error'));
                    setIsErrorModalOpen(true);
                }
            }
        }
    }

    return (
        <PageContainer {...props}>
            <ImageContainer src={RegisterBackground} />
            <FormContainer>
                <TextContainer>
                    <LoginText>{t('Register')}</LoginText>
                </TextContainer>

                <TextInput {...register('userName')} placeholder={t('Register.name')} />
                <TextInput {...register('userCpf')} placeholder={t('Register.cpf')} />
                <TextInput {...register('userEmail')} placeholder={t('Register.email')} />
                <TextInput type={'password'} {...register('userPassword')} placeholder={t('Register.password')} />

                <ContainedButton onClick={handleSubmit(handleFormSubmit)}>
                    <Text>{t('common.Register')}</Text>
                </ContainedButton>

                <ErrorModal isOpen={isErrorModalOpen} onClose={closeErrorModal} errorMessage={error || ''} />
            </FormContainer>
        </PageContainer>
    );
}

export default RegisterPage;
