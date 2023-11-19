import { PageContainer } from '@/components/container/container.ui';
import BaseLayout from '@/components/layout/base-layout/base-layout.ui';
import Spacings from '@/styles/tokens/spacing';
import { Text } from '@chakra-ui/react';
import CreateQuotationForm from './create-quotation-form.ui';
import Modal from '@/components/modal.ui';
import TrackQuotationSection from './track-quotation-section.ui';
import useQuotationLogic from './quotation.logic';

function QuotationPage({ ...props }) {
    const { isOpenCreateModal, closeCreateModalHandler, onSubmitTrackQuotation, onSubmitCreateQuotation } =
        useQuotationLogic();
    return (
        <BaseLayout {...props}>
            <Modal title={'Cotação enviada!'} isOpen={isOpenCreateModal} onClose={closeCreateModalHandler}>
                <Text>Utilize seu CPF para acompanhar as ofertas que serão disponibilizadas</Text>
            </Modal>

            <TrackQuotationSection onSubmit={onSubmitTrackQuotation} />

            <PageContainer style={{ width: '80%' }} gap={Spacings.MEDIUM}>
                <CreateQuotationForm onSubmit={onSubmitCreateQuotation} />
            </PageContainer>
        </BaseLayout>
    );
}

export default QuotationPage;
