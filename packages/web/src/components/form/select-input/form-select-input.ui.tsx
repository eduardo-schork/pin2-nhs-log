import { VContainer } from '@/components/container/container.ui';
import Colors from '@/styles/tokens/color';
import { FormLabel, Select, SelectProps } from '@chakra-ui/react';
import styled from 'styled-components';

function FormSelectInput({
    label,
    name,
    methods,
    children,
    ...props
}: { label?: string; name: string; methods: any } & SelectProps) {
    return (
        <VContainer style={{ width: '100%' }}>
            {label && <FormLabel>{label}</FormLabel>}
            <StyledSelect {...props} {...methods.register(name)}>
                {children}
            </StyledSelect>
        </VContainer>
    );
}

const StyledSelect = styled(Select)`
    && {
        width: 100%;
        height: 50px;
        align-self: center;
        background-color: ${Colors.WHITE};
    }
`;

export default FormSelectInput;
