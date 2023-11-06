import { PageContainer } from '@/components/container/container.ui';
import BaseLayout from '@/components/layout/base-layout/base-layout.ui';
import Spacings from '@/styles/tokens/spacing';
import { Text } from '@chakra-ui/react';
import Modal from '@/components/modal.ui';
import useQuotationLogic from '../../features/quotation/quotation.logic';

function QuotationPage({ ...props }) {
    const { isOpenCreateModal, closeCreateModalHandler } =
        useQuotationLogic();
    return (
        <BaseLayout {...props}>
            <Modal title={'Oferta aprovada!'} isOpen={isOpenCreateModal} onClose={closeCreateModalHandler}>
                <Text>Realize o agendamento de coleta e pagamento!</Text>
            </Modal>
            <PageContainer gap={Spacings.MEDIUM}>
            </PageContainer>
        </BaseLayout>
    );
}

export default QuotationPage;
