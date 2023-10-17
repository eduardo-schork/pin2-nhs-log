import { useEffect, useState } from 'react';
import Modal, { TModalProps } from '../modal.ui';

function QuotationOffersModal({ quotationId, ...props }: TModalProps & { quotationId?: number }) {
    const [quotationOffers, setQuotationOffers] = useState();

    useEffect(() => {
        if (!quotationId) return;
        // TODO fetch quotation offers and set into state
    }, [quotationId]);

    return (
        <Modal {...props} title={'Ofertas da cotação'}>
            <></>
        </Modal>
    );
}

export default QuotationOffersModal;
