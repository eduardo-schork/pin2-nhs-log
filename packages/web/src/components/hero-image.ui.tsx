import BackgroundImage from '@/assets/background-home.png';
import { styled } from 'styled-components';

const HeroImage = styled.img.attrs({
    src: BackgroundImage,
})`
    object-fit: cover;
    min-height: 60%;
    max-height: 70%;
`;

export default HeroImage;
