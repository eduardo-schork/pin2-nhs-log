import TQuotationModel from '@/models/Quotation.model';
import Colors from '@/styles/tokens/color';
import Spacings from '@/styles/tokens/spacing';
import { Text } from '@chakra-ui/react';
import { styled } from 'styled-components';

function QuotationItem({ quotation, ...props }: { quotation: TQuotationModel }) {
    return (
        <QuotationContainer {...props}>
            <Text>#{quotation.id}</Text>
            {quotation.cpf}
        </QuotationContainer>
    );
}

const QuotationContainer = styled.div`
    display: flex;
    height: fit-content;
    flex-direction: column;
    padding: ${Spacings.MEDIUM};
    border-radius: ${Spacings.SMALL};
    background-color: ${Colors.LIGHT_BACKGROUND};
`;

export default QuotationItem;
