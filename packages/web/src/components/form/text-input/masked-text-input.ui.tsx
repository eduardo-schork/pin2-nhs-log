import InputErrorLabel from '@/components/InputErrorLabel.ui';
import { VContainer } from '@/components/container/container.ui';
import Colors from '@/styles/tokens/color';
import { FormLabel, Input, InputProps } from '@chakra-ui/react';
import ReactInputMask from 'react-input-mask';

function MaskedTextInput({
    error,
    mask,
    methods,
    name,
    label,
    style,
    ...props
}: {
    mask: string;
    error?: string;
    label?: string;
    name: string;
    methods: any;
} & InputProps) {
    return (
        <VContainer style={{ width: '100%' }}>
            {label && <FormLabel>{label}</FormLabel>}
            <Input
                style={{
                    width: '100%',
                    height: '50px',
                    alignSelf: 'center',
                    backgroundColor: Colors.WHITE,
                    ...style,
                }}
                as={ReactInputMask}
                mask={mask}
                maskChar={null}
                placeholder={'Digite aqui'}
                {...props}
                {...methods?.register(name)}
            />
            <InputErrorLabel error={error || methods?.formState?.errors?.[name]?.message} />
        </VContainer>
    );
}

export default MaskedTextInput;
