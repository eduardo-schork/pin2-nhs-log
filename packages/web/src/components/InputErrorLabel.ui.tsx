import Colors from '@/styles/tokens/color';

function InputErrorLabel({ error, ...props }: { error?: string }) {
    return (
        <span {...props} style={{ color: Colors.ERROR, fontSize: '12px' }}>
            {error}
        </span>
    );
}

export default InputErrorLabel;
