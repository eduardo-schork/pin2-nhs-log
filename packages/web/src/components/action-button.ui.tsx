import { styled } from 'styled-components';
import { ContainedButton } from './button/button.ui';
import Colors from '@/styles/tokens/color';

const ActionButton = styled(ContainedButton)`
    && {
        height: 100px;
        width: 400px;
        background-color: ${Colors.WHITE};
        border: 1px solid ${Colors.PRIMARY};
        color: ${Colors.DARK_GREY};
    }
`;

export default ActionButton;
