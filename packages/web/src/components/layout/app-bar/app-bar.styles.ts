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
    height: 80px !important;
    background-color: ${Colors.WHITE};
    box-shadow: 0 2px 6px -1px ${Colors.DARK_TRANSPARENT};
`;

export const LogoImage = styled.img`
    width: 12%;
    height: 100%;
    display: block;
    align-self: center;
    padding: ${Spacings.MEDIUM};
    cursor: pointer;
`;
