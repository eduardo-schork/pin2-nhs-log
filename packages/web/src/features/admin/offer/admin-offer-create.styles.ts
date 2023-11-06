import styled from 'styled-components';
import Spacings from '@/styles/tokens/spacing';
import FontSizes from '@/styles/tokens/font-size';

const RegisterDivMargin = {
    MARGINTOP: '0px',
    MARGINLEFT: '-45px',
};

const RegisterTextMargin = {
    MARGINTOP: '-35.7px',
    MARGINLEFT: '170.06px',
};

export const FormContainer = styled.div`
    align-self: flex-start;
    display: flex;
    flex-direction: column;
    width: 150%;
    height: 100%;
    justify-content: center;

    gap: ${Spacings.MEDIUM};
    padding: ${Spacings.MEDIUM};
    margin-top: ${RegisterDivMargin.MARGINTOP};
    margin-left: ${RegisterDivMargin.MARGINLEFT};
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
