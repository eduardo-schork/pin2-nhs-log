import React from 'react';
import { Container, Content } from './base-layout.styles';
import AppBar from '../app-bar/app-bar.ui';

function BaseLayout({
    children,
    withoutHeader = false,
}: {
    withoutHeader?: boolean;
    children?: React.ReactNode;
}): JSX.Element {
    return (
        <Container>
            {!withoutHeader && <AppBar />}
            <Content>{children}</Content>
        </Container>
    );
}
export default BaseLayout;
