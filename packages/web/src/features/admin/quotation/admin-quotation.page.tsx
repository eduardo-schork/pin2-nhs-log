import QuotationItem from '@/components/quotation/quotation-item.ui';
import BaseLayout from '@/components/layout/base-layout/base-layout.ui';
import { useEffect, useState } from 'react';
import HttpRequestPort from '@/infra/http-request/http-request.port';
import TQuotationModel from '@shared/models/Quotation.model';
import AdminTrackQuotationItem from './admin-track-quotation-item';

function AdminQuotationPage({ ...props }: { quotations?: TQuotationModel[] }) {
    const [quotationList, setQuotationList] = useState<TQuotationModel[]>([]);

    useEffect(() => {
        (async () => {
            const returnData = (await HttpRequestPort.get({
                path: '/api/quotation-not-approved',
            })) as TQuotationModel[];

            if (returnData.length > 0) {
                setQuotationList(returnData);
            }
        })();
    }, []);

    return (
        <BaseLayout>
            <QuotationItem.ListContainer {...props}>
                {quotationList?.map((quotation: TQuotationModel) => (
                    <AdminTrackQuotationItem key={quotation.id} data={quotation} />
                ))}
            </QuotationItem.ListContainer>
        </BaseLayout>
    );
}

export default AdminQuotationPage;
