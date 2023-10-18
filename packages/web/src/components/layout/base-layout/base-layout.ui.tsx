import { Container, Content } from './base-layout.styles';
import AppBar from '../app-bar/app-bar.ui';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function BaseLayout({
    children,
    withoutHeader = false,
    userId,
}: {
    withoutHeader?: boolean;
    children?: React.ReactNode;
    userId?: any;
}): JSX.Element {
    return (
        <Container>
            <ToastContainer />
            {!withoutHeader && <AppBar userId={userId} />}
            <Content>{children}</Content>
        </Container>
    );
}
export default BaseLayout;
