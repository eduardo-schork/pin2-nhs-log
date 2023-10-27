import Colors from '@/styles/tokens/color';
import { Divider as ChackraDivider } from '@chakra-ui/react';
import styled from 'styled-components';

const Divider = styled(ChackraDivider).attrs({
    borderColor: Colors.PRIMARY,
})``;

export default Divider;
