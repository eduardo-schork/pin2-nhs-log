import { Container, Content } from './base-layout.styles';
import AppBar from '../app-bar/app-bar.ui';

function BaseLayout({
    children,
    withoutHeader = false,
    userId,
}: {
    withoutHeader?: boolean;
    children?: React.ReactNode;
    userId: any;
}): JSX.Element {
    return (
        <Container>
            {!withoutHeader && <AppBar userId={userId} />}
            <Content>{children}</Content>
        </Container>
    );
}
export default BaseLayout;
