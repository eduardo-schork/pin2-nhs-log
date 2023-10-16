import { useState } from 'react'; // Importe o useState
import { Text } from '@chakra-ui/react';
import LoginBackground from '@/assets/login-page.png';
import { ContainedButton } from '@/components/button/button.ui';
import TextInput from '@/components/text-input/text-input.ui';
import { LoginText, TextContainer, FormContainer, ImageContainer, PageContainer } from './login.styles';
import { useForm } from 'react-hook-form';
import t from '@/infra/i18n';
import { useNavigate } from 'react-router-dom';
import ErrorModal from './error.modal';

type TLoginPageFormValues = {
    userEmail: string;
    userPassword: string;
};

function LoginPage({ ...props }) {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm<TLoginPageFormValues>();
    const [error, setError] = useState<string | null>(null);
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

    const closeErrorModal = () => {
        setError(null);
        setIsErrorModalOpen(false);
    };

    async function handleFormSubmit(data: TLoginPageFormValues) {
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
                navigate('/admin', { state: { userId: result} });
            } else {
                setError(t('Login.userNotFound'));
                setIsErrorModalOpen(true);
            }
        }
    }

    return (
        <PageContainer {...props}>
            <ImageContainer src={LoginBackground} />
            <FormContainer>
                <TextContainer>
                    <LoginText>{t('Login')}</LoginText>
                </TextContainer>

                <TextInput {...register('userEmail')} placeholder={t('Login.email')} />
                <TextInput type={'password'} {...register('userPassword')} placeholder={t('Login.password')} />

                <ContainedButton onClick={handleSubmit(handleFormSubmit)}>
                    <Text>{t('common.Enter')}</Text>
                </ContainedButton>

                <ErrorModal isOpen={isErrorModalOpen} onClose={closeErrorModal} errorMessage={error || ''} />
            </FormContainer>
        </PageContainer>
    );
}

export default LoginPage;
