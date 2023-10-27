import BaseLayout from '@/components/layout/base-layout/base-layout.ui';
import { Text, useDisclosure } from '@chakra-ui/react';

import QuotationOffersModal from '@/components/modals/quotation-offers-modal.ui';
import { useEffect, useState } from 'react';
import TrackQuotationItem from './track-quotation-item.ui';
import HttpRequestPort from '@/infra/http-request/http-request.port';
import TQuotationModel from '@shared/models/Quotation.model';
import { useParams } from 'react-router-dom';
import QuotationItem from '@/components/quotation/quotation-item.ui';

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

            <Text fontWeight={'bold'} alignSelf={'center'} fontSize="2xl">
                Acompanhar cotações
            </Text>

            <QuotationItem.ListContainer>
                {quotationList?.map((quotationItem, index) => (
                    <TrackQuotationItem
                        key={index}
                        item={quotationItem}
                        onItemSeeOffersPress={onShowOffersFromQuotationPress}
                    />
                ))}
            </QuotationItem.ListContainer>
        </BaseLayout>
    );
}

export default TrackQuotationPage;
