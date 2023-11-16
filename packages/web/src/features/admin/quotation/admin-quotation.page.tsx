import QuotationItem from '@/components/quotation/quotation-item.ui';
import BaseLayout from '@/components/layout/base-layout/base-layout.ui';

import { useEffect, useState } from 'react';
import HttpRequestPort from '@/infra/http-request/http-request.port';
import TQuotationModel from '@shared/models/Quotation.model';
import AdminTrackQuotationItem from './admin-track-quotation-item';
import TextInputWithButton from '@/components/text-input/text-input-with-button.ui';
import { VContainer } from '@/components/container/container.ui';
import Spacings from '@/styles/tokens/spacing';
import styled from 'styled-components';
import t from '@/infra/i18n';
import PageTitleBar from '@/components/page-title-bar.ui';

function AdminQuotationPage({ ...props }: { quotations?: TQuotationModel[] }) {
    const [quotationList, setQuotationList] = useState<TQuotationModel[]>([]);

    useEffect(() => {
        (async () => {
            await handleFetchQuotations();
        })();
    }, []);

    const handleFollowQuotation = (value: string) => {
        // TODO filtrar as cotações por horário
    };

    async function handleFetchQuotations() {
        const returnData = (await HttpRequestPort.get({
            path: '/api/quotation-not-approved',
        })) as TQuotationModel[];

        if (returnData.length > 0) {
            setQuotationList(returnData);
        }
    }
    return (
        <BaseLayout>
            <PageTitleBar title={'Acompanhar cotações'} />

            <FollowQuotationContainer>
                <TextInputWithButton
                    placeholder={t('Quotation.LookUpByCreatedTime')}
                    buttonLabel={t('Quotation.NewQuotationForm.Follow')}
                    onButtonClick={handleFollowQuotation}
                />
            </FollowQuotationContainer>
            <QuotationItem.ListContainer {...props}>
                {quotationList?.map((quotation: TQuotationModel) => (
                    <AdminTrackQuotationItem
                        key={quotation.id}
                        data={quotation}
                        fetchQuotations={async () => await handleFetchQuotations()}
                    />
                ))}
            </QuotationItem.ListContainer>
        </BaseLayout>
    );
}

const FollowQuotationContainer = styled(VContainer)`
    padding: ${Spacings.SMALL};
    border-radius: ${Spacings.SMALL};
    width: 20%;
    align-self: left;
    min-width: 450px;
`;
export default AdminQuotationPage;
