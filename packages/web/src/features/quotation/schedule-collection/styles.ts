import styled from 'styled-components';
import BaseLayout from '@/components/layout/base-layout/base-layout.ui';
import Spacings from '@/styles/tokens/spacing';
import { Tab, TabList, Text } from '@chakra-ui/react';
import Colors from '@/styles/tokens/color';

export const RegisterDivMargin = {
    MARGINTOP: '0px',
    MARGINLEFT: '-45px',
};

export const RegisterTextMargin = {
    MARGINTOP: '-35.7px',
    MARGINLEFT: '170.06px',
};
export const PageContainer = styled(BaseLayout).attrs({
    withoutHeader: true,
})`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

export const Title = styled(Text)`
    margin-bottom: ${Spacings.MEDIUM};
`;

export const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: ${Spacings.MEDIUM};
    padding: ${Spacings.MEDIUM};
`;

export const StyledTab1 = styled(Tab)`
    margin-left: 100px;
`;

export const StyledTab2 = styled(Tab)`
    margin-left: 10px;
`;

export const Divs = styled.div`
    display: flex;
    flex-direction: row;
    width: 200%;
    margin-bottom: 10px;
`;

export const GridContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;
    border-radius: 10px;
`;

export const StyledTabList = styled(TabList)`
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    margin: 0px;

    background-color: ${Colors.WHITE};
`;

export const DivText = styled.div`
    font-weight: bold;
    font-size: '2xl';
    width: 200%;
    margin: 15px 0px 10px 0px;
`;

export const ButtonProx = styled.button`
    align-self: center;
    background-color: #0c8ce9;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    margin-bottom: 10px;
    margin-top: 10px;
    margin-left: 85%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color 0.3s;

    &:hover {
        background-color: #0a6ebd;
    }
`;

export const ButtonAddress = styled.button`
    align-self: center;
    background-color: #0c8ce9;
    color: white;
    border: none;
    padding: 2px 10px;
    cursor: pointer;
    margin-top: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color 0.3s;

    &:hover {
        background-color: #0a6ebd;
    }
`;
