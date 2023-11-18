import { Button, ButtonProps } from '@chakra-ui/react';
import { styled } from 'styled-components';
import Colors from '@/styles/tokens/color';

export const ContainedButton = styled(Button).attrs({
    _hover: { bg: Colors.BLUE, borderColor: Colors.BLUE },
})<ButtonProps>`
    && {
        width: fit-content;
        align-self: center;
        height: 50px;
        background-color: transparent;
        background-color: ${Colors.SECONDARY};
        color: ${Colors.WHITE};
    }
`;
