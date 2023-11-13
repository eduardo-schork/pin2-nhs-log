import styled from 'styled-components';
import BaseLayout from '@/components/layout/base-layout/base-layout.ui';
import Spacings from '@/styles/tokens/spacing';
import FontSizes from '@/styles/tokens/font-size';

const RegisterTextMargin = {
    MARGINTOP: '-35.7px',
    MARGINLEFT: '170.06px',
};

export const PageContainer = styled(BaseLayout).attrs({
    withoutHeader: true,
})`
    position: relative;
`;

export const FormContainer = styled.div`
    display: flex;
    height: 100%;
    align-self: flex-start;
    flex-direction: column;
    justify-content: center;

    gap: ${Spacings.MEDIUM};
    padding: ${Spacings.MEDIUM};
`;

export const ImageContainer = styled.img`
    display: flex;
    max-height: 100%;
    min-height: 100%;
    max-width: 100%;
    min-width: 100%;
`;

export const TextContainer = styled.div`
    margin-top: ${RegisterTextMargin.MARGINTOP};
    margin-left: ${RegisterTextMargin.MARGINLEFT};
`;

export const LoginText = styled.span`
    font-size: ${FontSizes.DEFAULT};
    font-weight: bold;
`;

export const CustomModalContent = styled.div`
    width: 400px;
    max-width: 90%;
`;
