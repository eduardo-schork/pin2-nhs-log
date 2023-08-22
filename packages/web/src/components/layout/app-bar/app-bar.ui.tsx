import { useNavigate } from 'react-router-dom';
import { Container, LogoImage } from './app-bar.styles';
import ImagePng from '@/assets/logo.png';

function AppBar({ ...props }): JSX.Element {
    const navigate = useNavigate();

    function handleOnClickLogo() {
        navigate(`/`);
    }

    return (
        <Container {...props}>
            <LogoImage src={ImagePng} onClick={handleOnClickLogo} alt={'logo'} />
        </Container>
    );
}

export default AppBar;
