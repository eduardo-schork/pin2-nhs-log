import Colors from '@/styles/tokens/color';
import { Input } from '@chakra-ui/react';
import { styled } from 'styled-components';

const TextInput = styled(Input)`
    && {
        width: 80%;
        height: 50px;
        align-self: center;
        background-color: ${Colors.WHITE};
    }
`;

export default TextInput;
