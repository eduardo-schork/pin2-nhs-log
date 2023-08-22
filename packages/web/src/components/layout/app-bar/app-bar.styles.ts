import Colors from '@/styles/tokens/color';
import Spacings from '@/styles/tokens/spacing';
import styled from 'styled-components';

export const Container = styled.div`
    top: 0;
    width: 100%;
    display: flex;
    border-radius: 0;
    position: sticky;
    height: 80px !important;
    background-color: ${Colors.WHITE};
    box-shadow: 0 2px 6px -1px ${Colors.DARK_TRANSPARENT};
`;

export const LogoImage = styled.img`
    max-height: 100%;
    max-width: 100%;
    height: 100%;
    width: 12%;
    align-self: center;
    padding: ${Spacings.MEDIUM};
`;
