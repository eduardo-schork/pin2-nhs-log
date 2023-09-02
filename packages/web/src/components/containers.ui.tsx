import Spacings from '@/styles/tokens/spacing';
import { styled } from 'styled-components';

const PageActions = styled.div`
    display: flex;
    width: 100%;
    padding: ${Spacings.MEDIUM};
    gap: ${Spacings.EXTRA_LARGE};
    justify-content: center;
`;

const Containers = {
    PageActions,
};

export default Containers;
