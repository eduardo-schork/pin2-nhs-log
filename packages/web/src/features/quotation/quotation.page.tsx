import { PageContainer } from '@/components/container/container.ui';
import BaseLayout from '@/components/layout/base-layout/base-layout.ui';
import Spacings from '@/styles/tokens/spacing';
import { Text, useDisclosure } from '@chakra-ui/react';
import CreateQuotationForm from './create-quotation-form.ui';
import Modal from '@/components/modal.ui';
import TrackQuotationSection from './track-quotation-section.ui';
import { useNavigate } from 'react-router-dom';
import HttpRequestPort from '@/infra/http-request/http-request.port';

function QuotationPage({ ...props }) {
    const navigate = useNavigate();

    const {
        isOpen: isOpenCreateModal,
        onOpen: openCreateModalHandler,
        onClose: closeCreateModalHandler,
    } = useDisclosure();

    function normalizeQuotationWithAddresses(data: any) {
        return {
            quotation: {
                cpf: data.cpf,
                email: data.email,
                currentDate: Date.now(),
            },
            itemRemittance: {
                objectType: data.remittanceType,
                weight: data.remittanceWeight,
            },
            originAddress: data.originAddress,
            destinationAddress: data.destinationAddress,
        };
    }

    async function onSubmitCreateQuotation(data: any) {
        const normalizedData = normalizeQuotationWithAddresses(data);
        console.log({ normalizedData });

        const returndata = await HttpRequestPort.post({ path: '/api/quotation', body: normalizedData });

        openCreateModalHandler();
    }

    function onSubmitTrackQuotation(value: string) {
        console.log({ value });
        navigate('/quotation/track');
    }

    return (
        <BaseLayout {...props}>
            <Modal title={'Cotação enviada!'} isOpen={isOpenCreateModal} onClose={closeCreateModalHandler}>
                <Text>Utilize seu CPF para acompanhar as ofertas que serão disponibilizadas</Text>
            </Modal>

            <TrackQuotationSection onSubmit={onSubmitTrackQuotation} />

            <PageContainer gap={Spacings.MEDIUM}>
                <CreateQuotationForm onSubmit={onSubmitCreateQuotation} />
            </PageContainer>
        </BaseLayout>
    );
}

export default QuotationPage;
