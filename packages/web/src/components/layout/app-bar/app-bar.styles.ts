import Colors from '@/styles/tokens/color';
import Spacings from '@/styles/tokens/spacing';
import styled from 'styled-components';

export const Container = styled.div`
    top: 0;
    justify-content: space-between;
    width: 100%;
    padding: 0 ${Spacings.LARGE};
    display: flex;
    border-radius: 0;
    position: sticky;
    z-index: 999;
    height: 80px !important;
    box-shadow: 0 2px 6px -1px ${Colors.DARK_TRANSPARENT};
    background: ${Colors.SECONDARY};
`;

export const LogoImage = styled.img`
    height: 100%;
    display: block;
    align-self: center;
    padding: ${Spacings.MEDIUM};
    cursor: pointer;
`;
