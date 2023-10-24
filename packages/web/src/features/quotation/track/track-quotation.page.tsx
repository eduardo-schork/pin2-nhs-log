import BaseLayout from '@/components/layout/base-layout/base-layout.ui';
import { Text, useDisclosure } from '@chakra-ui/react';

import QuotationOffersModal from '@/components/modals/quotation-offers-modal.ui';
import { useEffect, useState } from 'react';
import QuotationItem from './quotation-item.ui';
import Container from '@/components/container/container.ui';
import styled from 'styled-components';
import Spacings from '@/styles/tokens/spacing';
import HttpRequestPort from '@/infra/http-request/http-request.port';
import TQuotationModel from '@shared/models/Quotation.model';
import { useParams } from 'react-router-dom';

function TrackQuotationPage({ ...props }) {
    const params = useParams();

    const [selectedQuotationId, setSelectedQuotationId] = useState<number>();
    const [quotationList, setQuotationList] = useState<TQuotationModel[]>();

    useEffect(() => {
        (async () => {
            const returnData = await HttpRequestPort.get({ path: `/api/quotation-by-cpf/${params.id}` });
            setQuotationList(returnData as TQuotationModel[]);
        })();
    }, [params.id]);

    const {
        isOpen: isOpenQuotationOffersModal,
        onOpen: openQuotationOffersModalHandler,
        onClose: closeQuotationOffersModalHandler,
    } = useDisclosure();

    function onShowOffersFromQuotationPress(quotationId: number) {
        setSelectedQuotationId(quotationId);
        openQuotationOffersModalHandler();
    }

    return (
        <BaseLayout {...props}>
            <QuotationOffersModal
                quotationId={selectedQuotationId}
                onClose={closeQuotationOffersModalHandler}
                isOpen={isOpenQuotationOffersModal}
            />

            <Text>Acompanhar cotações</Text>

            <QuotationsContainer grid gap={Spacings.LARGE}>
                {quotationList?.map((quotationItem, index) => (
                    <QuotationItem
                        key={index}
                        item={quotationItem}
                        onItemSeeOffersPress={onShowOffersFromQuotationPress}
                    />
                ))}
            </QuotationsContainer>
        </BaseLayout>
    );
}

const QuotationsContainer = styled(Container)`
    grid-template-columns: auto auto auto auto;
`;

export default TrackQuotationPage;
