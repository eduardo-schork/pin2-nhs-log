import { styled } from 'styled-components';
import { ContainedButton } from './button/button.ui';
import Colors from '@/styles/tokens/color';
import Spacings from '@/styles/tokens/spacing';

const ActionButton = styled(ContainedButton).attrs({
    _hover: { bg: Colors.SECONDARY },
})`
    && {
        gap: ${Spacings.SMALL};
        height: 75px;
        min-width: 300px;
        background-color: ${Colors.SECONDARY};
        color: ${Colors.WHITE};
    }
`;

export default ActionButton;
