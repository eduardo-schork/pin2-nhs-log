import InputErrorLabel from '@/components/InputErrorLabel.ui';
import { VContainer } from '@/components/container/container.ui';
import TextInput from '@/components/text-input/text-input.ui';
import { FormLabel, InputProps } from '@chakra-ui/react';

function FormTextInput({
    error,
    methods,
    name,
    label,
    ...props
}: { error?: string; label?: string; name: string; methods: any } & InputProps) {
    return (
        <VContainer style={{ width: '100%' }}>
            {label && <FormLabel>{label}</FormLabel>}
            <TextInput placeholder={'Digite aqui'} {...props} {...methods?.register(name)} />
            <InputErrorLabel error={error || methods?.formState?.errors?.[name]?.message} />
        </VContainer>
    );
}

export default FormTextInput;
