import t from '@/infra/i18n';
import { Text } from '@chakra-ui/react';
import { styled } from 'styled-components';

const CopyrightText = styled(Text).attrs({
    children: t('Home.Copyright'),
})`
    align-self: center;
`;

export default CopyrightText;
