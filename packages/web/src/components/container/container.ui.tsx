import styled from 'styled-components';

import { StyledContainer } from './container.styles';

export type ContainerProps = React.ComponentProps<'div'> & {
    direction?: 'row' | 'column';
    grid?: boolean;
    gap?: string;
};

function Container({ gap, children, grid = false, direction = 'row', ...props }: ContainerProps) {
    return (
        <StyledContainer {...props} direction={direction} $gap={gap} $display={grid ? 'grid' : 'flex'}>
            {children}
        </StyledContainer>
    );
}

export const HContainer: React.FC<ContainerProps> = styled(Container).attrs({
    direction: 'row',
})``;

export const VContainer: React.FC<ContainerProps> = styled(Container).attrs({
    direction: 'column',
})``;

export const PageContainer: React.FC<ContainerProps> = styled(Container).attrs({
    direction: 'column',
})`
    align-self: center;
    width: 80%;
`;

export default Container;
