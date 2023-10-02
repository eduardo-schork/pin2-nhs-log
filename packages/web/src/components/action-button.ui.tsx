import { styled } from 'styled-components';
import { ContainedButton } from './button/button.ui';
import Colors from '@/styles/tokens/color';

const ActionButton = styled(ContainedButton)`
    && {
        height: 75px;
        width: 400px;
        background-color: ${Colors.WHITE};
        border: 1px solid ${Colors.SECONDARY};
        color: ${Colors.DARK_GREY};
    }
`;

export default ActionButton;
