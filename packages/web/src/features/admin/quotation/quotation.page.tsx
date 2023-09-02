import QuotationItem from '@/components/quotation/quotation-item.ui';
import QuotationMock from '../../../../../shared/src/fixtures/quotation-item.mock.json';
import TQuotationModel from '@/models/Quotation.model';
import BaseLayout from '@/components/layout/base-layout/base-layout.ui';
import { styled } from 'styled-components';
import Spacings from '@/styles/tokens/spacing';

const mock = [QuotationMock, QuotationMock, QuotationMock, QuotationMock, QuotationMock];

function QuoationPage({ quotations = mock, ...props }: { quotations?: TQuotationModel[] }) {
    return (
        <BaseLayout>
            <QuotationPageContainer {...props}>
                {quotations.map((quotation) => (
                    <QuotationItem quotation={quotation} />
                ))}
            </QuotationPageContainer>
        </BaseLayout>
    );
}

const QuotationPageContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    gap: ${Spacings.MEDIUM};
`;

export default QuoationPage;
