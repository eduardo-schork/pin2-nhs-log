import { Button } from '@chakra-ui/react';
import { styled } from 'styled-components';
import Colors from '@/styles/tokens/color';

export const ContainedButton = styled(Button)`
    && {
        width: 80%;
        align-self: center;
        height: 50px;
        background-color: ${Colors.BLUE};
        border: 1px solid ${Colors.BLUE};
    }
`;
