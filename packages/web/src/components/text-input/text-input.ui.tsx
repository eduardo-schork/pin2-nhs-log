import Colors from '@/styles/tokens/color';
import { Input, InputProps } from '@chakra-ui/react';
import { styled } from 'styled-components';

const TextInput: React.FC<InputProps> = styled(Input)`
    && {
        width: 100%;
        height: 50px;
        align-self: center;
        background-color: ${Colors.WHITE};
    }
`;

export default TextInput;
