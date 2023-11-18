import styled from 'styled-components';
import Colors from '../../../styles/tokens/color';

export const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    overflow-x: hidden;
    flex-direction: column;
    background-color: ${Colors.WHITE};
`;

export const Content = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`;
