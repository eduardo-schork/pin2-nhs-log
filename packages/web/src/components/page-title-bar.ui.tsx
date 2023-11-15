import { HContainer } from './container/container.ui';
import Spacings from '@/styles/tokens/spacing';
import Colors from '@/styles/tokens/color';
import { Text } from '@chakra-ui/react';

function PageTitleBar({ title, ...props }: { title: string }) {
    return (
        <HContainer
            {...props}
            style={{
                width: '100%',
                height: 'fit-content',
                justifyContent: 'center',
                padding: Spacings.SMALL,
                marginBottom: Spacings.MEDIUM,
                background: Colors.WHITE,
            }}
        >
            <Text color={Colors.DARK_GREY} fontSize={'2xl'} alignSelf={'center'} fontWeight={'bold'}>
                {title}
            </Text>
        </HContainer>
    );
}

export default PageTitleBar;
