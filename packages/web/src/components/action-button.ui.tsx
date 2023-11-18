import { styled } from 'styled-components';
import { ContainedButton } from './button/button.ui';
import Colors from '@/styles/tokens/color';

const ActionButton = styled(ContainedButton).attrs({
    _hover: { bg: Colors.SECONDARY },
})`
    && {
        height: 75px;
        min-width: 400px;
        background-color: ${Colors.SECONDARY};
        color: ${Colors.WHITE};
    }
`;

export default ActionButton;
