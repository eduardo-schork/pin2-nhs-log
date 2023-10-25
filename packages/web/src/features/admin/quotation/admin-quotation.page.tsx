import QuotationItem from '@/components/quotation/quotation-item.ui';
// import QuotationMock from '@/fixtures/quotation-item.mock.json';
import TQuotationModel from '@/models/Quotation.model';
import BaseLayout from '@/components/layout/base-layout/base-layout.ui';
import { styled } from 'styled-components';
import Spacings from '@/styles/tokens/spacing';
import { useEffect, useState } from 'react';

// const mock = [QuotationMock, QuotationMock, QuotationMock, QuotationMock, QuotationMock];

function AdminQuoationPage({ ...props }: { quotations?: TQuotationModel[] }) {
    const [quotationList, setQuotationList] = useState<TQuotationModel[]>([]);

    useEffect(() => {}, []);

    return (
        <BaseLayout>
            <QuotationPageContainer {...props}>
                {quotationList?.map((quotation) => (
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

export default AdminQuoationPage;
