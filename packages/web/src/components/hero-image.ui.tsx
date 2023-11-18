import BackgroundImage from '@/assets/background-home.png';
import { ImgHTMLAttributes, PropsWithChildren } from 'react';
import { styled } from 'styled-components';
import { HContainer } from './container/container.ui';
import QuotationItem from './quotation/quotation-item.ui';
import Spacings from '@/styles/tokens/spacing';
import Colors from '@/styles/tokens/color';
import { Url } from 'url';

const Image = styled.img.attrs({
    src: BackgroundImage,
})`
    display: flex;
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

function HeroImage({ children, src, ...props }: { src: string | Url } & PropsWithChildren) {
    return (
        <HContainer
            {...props}
            style={{
                minHeight: '550px',
                maxHeight: '550px',
                position: 'relative',
            }}
        >
            <Image src={src || BackgroundImage} />
            {!!children && (
                <QuotationItem.Container
                    style={{
                        maxWidth: '500px',
                        margin: Spacings.EXTRA_LARGE,
                        backgroundColor: Colors.BACKGROUND_TRANSPARENT,
                        position: 'absolute',
                        zIndex: 10,
                    }}
                >
                    {children}
                </QuotationItem.Container>
            )}
        </HContainer>
    );
}

export default HeroImage;
