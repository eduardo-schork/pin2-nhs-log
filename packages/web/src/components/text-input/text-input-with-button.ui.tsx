import { InputGroup, InputProps, InputRightElement } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { ContainedButton } from '../button/button.ui';
import MaskedTextInput from '../form/text-input/masked-text-input.ui';

function TextInputWithButton({
    buttonLabel,
    onButtonClick,
    mask = '',
    ...props
}: {
    mask?: string;
    buttonLabel: string;
    onButtonClick: (text: string) => void;
} & InputProps) {
    const methods = useForm<{ inputValue: string }>();

    return (
        <InputGroup>
            <MaskedTextInput
                methods={methods}
                style={{ height: '50px' }}
                mask={mask}
                {...props}
                {...methods.register('inputValue')}
            />
            <InputRightElement style={{ height: '50px', alignSelf: 'center', width: '110px' }}>
                <ContainedButton onClick={() => onButtonClick(methods.getValues('inputValue'))}>
                    {buttonLabel}
                </ContainedButton>
            </InputRightElement>
        </InputGroup>
    );
}
export default TextInputWithButton;
