import styled from 'styled-components';
import BaseLayout from '@/components/layout/base-layout/base-layout.ui';
import Spacings from '@/styles/tokens/spacing';
import FontSizes from '@/styles/tokens/font-size';
import { Button, ButtonProps, Input, Tab, Text } from '@chakra-ui/react';
import { HContainer, VContainer } from '@/components/container/container.ui';
import Colors from '@/styles/tokens/color';


export const ImageBackground = styled(HContainer)`
    min-height: 600px;
    width: 100vw;
    margin-bottom: ${Spacings.MEDIUM};
    justify-content: center;
    background-size: cover;
    background-image: url('https://arquivei.com.br/storage/2022/12/shutterstock_1701403327-scaled-2-2048x1152.jpg');
    `;

export const FollowQuotationContainer = styled(VContainer)`
    padding: ${Spacings.EXTRA_LARGE};
    background-color: ${Colors.WHITE_TRANSPARENT};
    border-radius: ${Spacings.SMALL};
    width: 40%;
    align-self: center;
    min-width: 550px;
`;
export const FooterContainer = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #ffffff;
    padding: 10px;
    border-top: 1px solid #ccc;
    /* Add more styles as needed */
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
  background-color: #cbcbcb;
  padding: 10px;
  margin: 50px 100px 100px 100px;
  border-radius: 10px; 
`;

export const DateContainer = styled.div`
    justify-content: space-between;
    font-size: 20px; 
    
    .date {
      font-size: 24px; 
      font-weight: bold; 
      margin-left: 20px;
      margin: 30px 0px 125px 10px;
    }

    .time {
        align-items: center;
        margin-left: 20px;
    }
`;

export const Address = styled.div`
    font-size: 20px; 
    margin: 20px 30px 40px 30px;
`;

export const DividerContainer = styled.div`
    width: 2px; 
    background-color: #000; 
    margin: 0 20px;
    height: 100%;

    .status {
        font-size: 24px; 
      font-weight: bold;
    }
`;

export const ContainedButton = styled.button`
        align-self: center;
        height: 500%;
        margin-top: 50px;
        background-color: #0c8ce9;
        color: #fff;
        border: 2px solid #0c8ce9;

  padding: 10px 20px; 

        &:hover {
            background-color: transparent;
            border: 2px solid #0c8ce9; 
            color: #000; 
          }

`;

