import { VContainer } from '@/components/container/container.ui';
import TextInput from '@/components/text-input/text-input.ui';
import { FormLabel, InputProps } from '@chakra-ui/react';

function FormTextInput({
    methods,
    name,
    label,
    ...props
}: { label?: string; name: string; methods: any } & InputProps) {
    return (
        <VContainer style={{ width: '100%' }}>
            {label && <FormLabel>{label}</FormLabel>}
            <TextInput placeholder={'Digite aqui'} {...props} {...methods?.register(name)} />
        </VContainer>
    );
}

export default FormTextInput;
