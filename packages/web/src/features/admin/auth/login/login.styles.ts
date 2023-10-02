import styled from 'styled-components';
import BaseLayout from '@/components/layout/base-layout/base-layout.ui';
import Spacings from '@/styles/tokens/spacing';
import FontSizes from '@/styles/tokens/font-size';

export const PageContainer = styled(BaseLayout).attrs({
    withoutHeader: true,
})`
    position: relative;
`;

const LoginDivMargin = {
    MARGINTOP: '-604.8px',
    MARGINLEFT: '506.52px',
};

const LoginTextMargin = {
    MARGINTOP: '-56.7px',
    MARGINLEFT: ' 177.06px',
};

export const FormContainer = styled.div`
    align-self: flex-start;
    display: flex;
    flex-direction: column;
    width: 30%;
    height: 100%;
    justify-content: center;

    gap: ${Spacings.MEDIUM};
    padding: ${Spacings.MEDIUM};
    margin-top: ${LoginDivMargin.MARGINTOP};
    margin-left: ${LoginDivMargin.MARGINLEFT};
`;

export const ImageContainer = styled.img`
    display: flex;
    max-height: 100%;
    min-height: 100%;
    max-width: 100%;
    min-width: 100%;
`;

export const TextContainer = styled.div`
    margin-top: ${LoginTextMargin.MARGINTOP};
    margin-left: ${LoginTextMargin.MARGINLEFT};
`;

export const LoginText = styled.span`
    font-size: ${FontSizes.DEFAULT};
    font-weight: bold;
`;
