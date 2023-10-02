import styled, { css } from 'styled-components';

import { ContainerProps } from './container.ui';

type TStyledContainerProps = ContainerProps & { $gap?: string; $display?: string };

export const StyledContainer: React.FC<TStyledContainerProps> = styled.div.attrs({})`
    ${(props: TStyledContainerProps) => {
        if (props.$gap) {
            return css`
                gap: ${props.$gap};
            `;
        }
    }}

    ${(props: TStyledContainerProps) => {
        return css`
            display: ${props.$display};
            flex-direction: ${props.direction};
        `;
    }}
`;
