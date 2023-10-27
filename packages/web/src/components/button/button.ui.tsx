import { Button, ButtonProps } from '@chakra-ui/react';
import { styled } from 'styled-components';
import Colors from '@/styles/tokens/color';

export const ContainedButton = styled(Button).attrs({})<ButtonProps>`
    && {
        width: fit-content;
        align-self: center;
        height: 50px;
        background-color: transparent;
        border: 1px solid ${Colors.PRIMARY};
    }
`;
