import { Container, Content } from './../../../../components/layout/base-layout/base-layout.styles';
import AppBar from '../../../../components/layout/app-bar/app-bar.ui';
import { ToastContainer } from 'react-toastify';

function BaseLayout({
    children,
    withoutHeader = false,
}: {
    withoutHeader?: boolean;
    children?: React.ReactNode;
}): JSX.Element {
    return (
        <Container>
            <ToastContainer />
            {!withoutHeader && <AppBar />}
            <Content>{children}</Content>
        </Container>
    );
}
export default BaseLayout;
