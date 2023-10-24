import styled from 'styled-components';
import BaseLayout from '@/components/layout/base-layout/base-layout.ui';
import Spacings from '@/styles/tokens/spacing';
import FontSizes from '@/styles/tokens/font-size';
import { Input, Tab, Text } from '@chakra-ui/react';

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
`;