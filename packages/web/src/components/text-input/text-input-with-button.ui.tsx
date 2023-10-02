import { InputGroup, InputProps, InputRightElement } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import TextInput from './text-input.ui';
import { ContainedButton } from '../button/button.ui';

function TextInputWithButton({
    buttonLabel,
    onButtonClick,
    ...props
}: {
    buttonLabel: string;
    onButtonClick: (text: string) => void;
} & InputProps) {
    const methods = useForm<{ inputValue: string }>();

    return (
        <InputGroup style={{ height: '40px' }}>
            <TextInput {...props} {...methods.register('inputValue')} />
            <InputRightElement style={{ alignSelf: 'center', width: '110px' }}>
                <ContainedButton onClick={() => onButtonClick(methods.getValues('inputValue'))}>
                    {buttonLabel}
                </ContainedButton>
            </InputRightElement>
        </InputGroup>
    );
}
export default TextInputWithButton;
