import BaseLayout from '@/components/layout/base-layout/base-layout.ui';
import { Text, useDisclosure } from '@chakra-ui/react';

import QuotationItemMock from '@shared/fixtures/quotation-item.mock.json';

import QuotationOffersModal from '@/components/modals/quotation-offers-modal.ui';
import { useState } from 'react';
import QuotationItem from './quotation-item.ui';

const QUOTATION_LIST = [
    QuotationItemMock,
    QuotationItemMock,
    QuotationItemMock,
    QuotationItemMock,
    QuotationItemMock,
    QuotationItemMock,
];

function TrackQuotationPage({ ...props }) {
    const data = QUOTATION_LIST;

    const [selectedQuotationId, setSelectedQuotationId] = useState<number>();

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

            {data?.map((quotationItem) => (
                <QuotationItem onItemSeeOffersPress={onShowOffersFromQuotationPress} item={quotationItem} />
            ))}
        </BaseLayout>
    );
}

export default TrackQuotationPage;
