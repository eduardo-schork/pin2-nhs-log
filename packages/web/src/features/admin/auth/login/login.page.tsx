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
import HttpRequestPort from '@/infra/http-request/http-request.port';

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
            return;
        }

        const queryParams = new URLSearchParams({
            userEmail: data.userEmail,
            userPassword: data.userPassword,
        });

        try {
            const response = (await HttpRequestPort.get({ path: `/api/admin/login?${queryParams}` })) as any;
            const userId = response?.userId;

            if (!userId) {
                setError(t('Login.userNotFound'));
                setIsErrorModalOpen(true);
                return;
            }

            localStorage.setItem('adminId', userId);
            navigate('/admin', { state: { userId: userId } });
        } catch (error) {
            console.error('Error:', error);
            setError(t('Login.userNotFound'));
            setIsErrorModalOpen(true);
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
