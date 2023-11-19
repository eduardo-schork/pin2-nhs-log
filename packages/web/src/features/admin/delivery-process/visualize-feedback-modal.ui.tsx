import { VContainer } from '@/components/container/container.ui';
import Divider from '@/components/divider';
import Modal, { TModalProps } from '@/components/modal.ui';
import QuotationItem from '@/components/quotation/quotation-item.ui';
import RatingStars from '@/components/rating-stars.ui';
import FontSizes from '@/styles/tokens/font-size';

import Spacings from '@/styles/tokens/spacing';
import formatDateToPresent from '@/utils/format-date-to-present';
import { Text } from '@chakra-ui/react';

import TDeliveryProcessModel from '@shared/models/DeliveryProcess.model';
import styled from 'styled-components';

function VisualizeFeedbackModal({
    deliveryProcess,
    ...props
}: TModalProps & { deliveryProcess?: TDeliveryProcessModel }) {
    const feedback = deliveryProcess?.feedback;

    return (
        <Modal {...props} title={`Visualizar feedback`}>
            <ModalContent>
                <Text fontWeight={'bold'} fontSize={'xl'}>
                    Remessa #{deliveryProcess?.id}
                </Text>

                <Divider />

                <ColumnContainer>
                    <QuotationItem.InfoLabel
                        style={{ alignSelf: 'center', fontSize: FontSizes.DEFAULT }}
                        label={'Avaliação'}
                        value={''}
                    />
                    <RatingStars disabled onChange={() => null} defaultScore={feedback?.rating} />

                    <Divider />

                    <QuotationItem.InfoLabel label={'Horário'} value={formatDateToPresent(feedback?.createdAt)} />
                    <QuotationItem.InfoLabel label={'Comentário'} value={feedback?.comment} />
                </ColumnContainer>
            </ModalContent>
        </Modal>
    );
}

const ColumnContainer = styled(VContainer)`
    gap: ${Spacings.MEDIUM};
    justify-content: space-evenly;
`;

const ModalContent = styled(VContainer)`
    gap: ${Spacings.LARGE};
    min-width: 30vw;
    height: 60vh;
    overflow: auto;
`;

export default VisualizeFeedbackModal;
