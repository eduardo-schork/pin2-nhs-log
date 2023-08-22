import { Text } from '@chakra-ui/react';

import BackgroundImage from '@/assets/background.png';
import { ContainedButton } from '@/components/button/button.ui';
import TextInput from '@/components/text-input/text-input.ui';
import { FormContainer, ImageContainer, LoginCardContainer, PageContainer } from './login.styles';
import { useForm } from 'react-hook-form';
import t from '@/infra/i18n';

import LogoPng from '@/assets/logo.png';
import { useNavigate } from 'react-router-dom';

type TLoginPageFormValues = {
    username: string;
    password: string;
};

function LoginPage({ ...props }) {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm<TLoginPageFormValues>();

    function handleFormSubmit(data: TLoginPageFormValues) {
        console.log({ data });
        navigate('/');
    }

    return (
        <PageContainer {...props}>
            <ImageContainer src={BackgroundImage} />
            <LoginCardContainer>
                <FormContainer>
                    <img src={LogoPng} />
                    <TextInput {...register('username')} />
                    <TextInput type={'password'} {...register('password')} />

                    <ContainedButton onClick={handleSubmit(handleFormSubmit)}>
                        <Text>{t('common.Enter')}</Text>
                    </ContainedButton>
                </FormContainer>
            </LoginCardContainer>
        </PageContainer>
    );
}

export default LoginPage;
