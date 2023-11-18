import styled from 'styled-components';
import Spacings from '@/styles/tokens/spacing';
import { HContainer, VContainer } from '@/components/container/container.ui';
import Colors from '@/styles/tokens/color';
import QuotationItem from '@/components/quotation/quotation-item.ui';

export const ImageBackground = styled(HContainer)`
    min-height: 550px;
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
    align-self: center;
    grid-gap: 10px;
    grid-template-columns: 1fr 1px 1fr;
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
    .status {
        font-size: 24px;
        font-weight: bold;
    }
    margin: 20px 30px 40px 30px;
`;

export const DividerContainer = styled.div`
    width: 1px;
    background-color: ${Colors.PRIMARY};
    height: 100%;

    align-self: center;
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
